import React, { useState, useEffect } from "react";
import { Package, CheckCircle, Clock, Search } from "lucide-react";

interface Order {
  id: string;
  customer: {
    name: string;
    email: string; // We don't collect email in checkout, but for dev we can fake it or use whatsapp
    whatsapp: string;
  };
  items: any[];
  total: number;
  status: "pending" | "paid" | "shipped";
  date: string;
  paymentMethod: string;
}

const AdminPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const updateStatus = (id: string, newStatus: "paid" | "shipped") => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order,
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-emerald-950">
            Admin Dashboard
          </h1>
          <div className="bg-white px-4 py-2 rounded-lg border border-stone-200 shadow-sm flex items-center gap-2 text-stone-500">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search orders..."
              className="outline-none text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-stone-500 font-medium">Pending Orders</h3>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Clock size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-800">
              {orders.filter((o) => o.status === "pending").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-stone-500 font-medium">Paid Orders</h3>
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-800">
              {orders.filter((o) => o.status === "paid").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-stone-500 font-medium">Shipped</h3>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Package size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-stone-800">
              {orders.filter((o) => o.status === "shipped").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-stone-500 text-sm border-b border-stone-200">
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-stone-400 italic"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-stone-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-sm text-stone-500">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-800">
                        {order.customer.name}
                      </div>
                      <div className="text-xs text-stone-500">
                        {order.customer.whatsapp}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-emerald-900">
                      Rp {order.total.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          order.status === "pending"
                            ? "bg-orange-100 text-orange-700"
                            : order.status === "paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {order.status === "pending" && (
                        <button
                          onClick={() => updateStatus(order.id, "paid")}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          Mark Paid
                        </button>
                      )}
                      {order.status === "paid" && (
                        <button
                          onClick={() => updateStatus(order.id, "shipped")}
                          className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          Ship Order
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
