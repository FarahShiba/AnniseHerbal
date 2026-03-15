import { Request, Response } from "express";
import { db } from "../config/firebase";
import { ProductTypes } from "../types/product";  // Import the existing type!
import { fetchProductByPath } from "../utils/productHelpers";

// At the top of your file
interface ProductParams {
  category: string;  // Define exactly what you expect
  sizeName: string;
  id: string;
}

// function to get all products from the firestore database
export const getAllProducts = async (req: Request, res: Response) => {
  try {
   // array to hold all products 
    const allProducts : ProductTypes[] = [];
   
   // reference to the products collection
    const productsCollection = db.collection("products");
 
   // fecth all products from the collection
    const categoriesSnapshot = await productsCollection.get();

   // categories and subcategories are stored as nested objects in the product document, 
   // so we need to loop through them to extract the data. We will create an array of products with their categories and 
   // products/pain relief/size 100ml/doc_id(unique)/product-details(fields).
   for (const cateforyDoc of categoriesSnapshot.docs) {
      // getting the category name from the document id
      const categoryName = cateforyDoc.id;

      // get all  sizes in the category  products/pain relief/
      // products/skincare/ ..
      const sizesSnapshot = await cateforyDoc.ref.listCollections();
      
      // loop through each size of the collections products/pain relief/size 100ml, 200ml, etc
      for(const sizeCollection of sizesSnapshot){
         const sizeName = sizeCollection.id;

         // get all products in this from  products/pain relief/size 100ml/doc_id {unique doc id}
         const productsSnapshot = await sizeCollection.get(); // getting all of the products

         // mapping each of the products
         productsSnapshot.docs.forEach( doc =>{
            const data = doc.data() as ProductTypes;
            allProducts.push({
               ...data, 
               id: doc.id,
               category:categoryName,
               sizeName:sizeName
            });
         });
      }
   
   }
   //  logs for debugging
   //  console.log("🔍 Fetched products snbapshot:", snapshot);
  
    // send the products as a response
    res.status(200).json(allProducts);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};




// function to get products by id from the firestore database
export const getProductById = async (req: Request<ProductParams>, res: Response) => {
   try {
      // get the product id from the request parameters
      // for instance :- products/pain relief/size 100ml/doc_id(unique)/
      const {category, sizeName, id } = req.params;

      console.log(`🔍 Fetching product with ID: ${category}/${sizeName}/${id}`);

      // fetch the product 
      const product = await fetchProductByPath(category, sizeName, id);

      if(!product){
         console.log(`❌ Product not found : ${category}/${sizeName}/${id}`);
         // 404 not found issue raised 
         return res.status(404).json({
            success:false,
            error:"Product not found",
            message:`Product with ID '${id}' not found in category '${category}' and size '${sizeName}'`
         });
      }

      // send successful response
      res.status(200).json({
         success:true,
         data:product
      });


   } catch (error) {
      console.error("❌ Error fetching product by ID:", error);

      res.status(500).json({
         success: false,
         error: "Failed to fetch product",
         message: "An error occurred while fetching the product. Please try again."
      });
   }
};





