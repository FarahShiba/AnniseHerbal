import { db } from '../config/firebase'; // Your Firestore instance
import { OrderItem, OrderItemRequest } from '../types/orders';
import { ProductTypes } from '../types/product';


// Frontend sends: { productId: "prod_123", quantity: 2 }
// You fetch REAL product from YOUR database
// You get REAL price (not from frontend!)
// You validate product exists
// You build complete OrderItem with all details

/** # 1
 * Fetch product from Firestore and validate it exists
 * @param productId - Product document ID
 * @returns Product data or null if not found
 */
export const fetchProductByPath = async (
    category: string,
    sizeName: string,
    productId: string
) : Promise<ProductTypes | null> => {

    try{
        console.log(`Fetching product with ID: ${productId} in category: ${category} and size: ${sizeName}`);

        // build path to specific product document
        const productDocRef = db.collection('products')
            .doc(category)
            .collection(sizeName)
            .doc(productId); // We expect only one product to match

        console.log(`Constructed Firestore path: products/${category}/${sizeName}/${productId}`);

        const productDoc = await productDocRef.get();

        if (!productDoc.exists) {
            console.warn(`Product with ID ${productId} not found in Firestore at path: products/${category}/${sizeName}/${productId}`);
            return null;
        }

        // building product data
        const productData = productDoc.data() as ProductTypes;

        // build complete product object with ID
        const product: ProductTypes = {
            ...productData,
            id: productDoc.id, // Ensure we have the ID in the product object
            sizeName: sizeName, // Add sizeName to product object for later use
            category: category, // Add category to product object for later use
        };

        console.log(`Fetched product data:`, product);
        return product;

    }catch(error){
        console.error("Error fetching product by ID:", error);
        return null;
    }

}


/** # 2  A OrderItem object
 * Build the  A OrderItem object for the order, using the product data and quantity and price
 * @param ProductType - Product document ID
 * @returns Product data or null if not found
 */
export const buildOrderItem = (
    product: ProductTypes,
    request: OrderItemRequest
) : OrderItem => {
    // Calculate subtotal
    const pricePerUnit = product.price; // Get price from our database, NOT from frontend
    const subtotal = pricePerUnit * request.quantity;
    
    return {
        productId: product.id, // Reference to original product
        category: product.category, // from our database
        sizeName: product.sizeName, // e.g., "100ml", "60ml"
        name: product.name, // Product name from our database
        imageUrl: product.image || "", // Save for order history (use empty string if no image)
        quantity: request.quantity, // From customer
        pricePerUnit, // Price from OUR database (security!)
        subtotal, // Calculated: pricePerUnit × quantity
        
    };

}


/** # 3  fetching all of the products and calculating the total price
 * Build the  A OrderItem object for the order, using the product data and quantity and price
 * @param ProductType - Product document ID
 * @returns Product data or null if not found
 */
export const fetchAndBuildOrderItems = async (
    itemResquests: OrderItemRequest[]
): Promise<{
    success: boolean;
    items?: OrderItem[];
    error?: string; 
}> =>{
    const orderItems: OrderItem[] = [];

    // loop through each item request 
    for(let i =0; i < itemResquests.length; i++){
        const request = itemResquests[i];
        // fetch product data from Firestore
        const product = await fetchProductByPath(request.category, request.sizeName, request.productId);
        if(!product){
           return{
            success: false,
            error: `Product not found: ${request.productId} in category: ${request.category} and size: ${request.sizeName}`,
            };
        }

        // check if product has valid price 
        if(! product.price || product.price <= 0){
            return{
                success: false,
                error: `Product price not avialble ${product.name}`,
            };
        }

        // build order item with real data from database 
        const orderItem = buildOrderItem(product, request);
        orderItems.push(orderItem);
    }
    // all products fetched successfully
    return{
        success: true,
        items: orderItems,
    };
}