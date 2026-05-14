  import { useEffect, useState } from "react";
  import axios from "axios";
  import { toast } from "sonner";

  export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const API = import.meta.env.VITE_API_URL || "https://sooclothing-1.onrender.com";;
    useEffect(() => {
      fetchOrders();
    }, []);

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${API}/api/orders`
        );

        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    // DELETE ORDER
    const deleteOrder = async (id) => {
      try {
        await axios.delete(
          `${API}/api/orders/${id}`
        );
       
        toast.success("Order deleted");

        fetchOrders();
      } catch (error) {
        console.log(error);
        console.log("FETCH ORDERS ERROR:", error);
        toast.error("Delete failed");
      }
    };

    // UPDATE STATUS
    const updateStatus = async (
      id,
      status
    ) => {
      try {
        await axios.put(
          `${API}/api/orders/${id}`,
          {
            status,
          }
        );

        toast.success("Status updated");

        fetchOrders();
      } catch (error) {
        console.log(error);

        toast.error(
          "Status update failed"
        );
      }
    };

    return (
      <div className="min-h-screen p-10 bg-white">

        <h1 className="text-4xl font-bold mb-10">
          Customer Orders
        </h1>

        <div className="space-y-8">

          {orders?.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="border p-6 rounded-xl"
              >

                {/* HEADER */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">

                  {/* USER DETAILS */}
                  <div>

                    <h2 className="text-2xl font-semibold">
                      {order.name}
                    </h2>

                    <p>{order.userEmail}</p>

                    <p>{order.phone}</p>

                    <p>
                      {order.address},{" "}
                      {order.city}
                    </p>

                    <p>
                      {order.zip},{" "}
                      {order.country}
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col gap-3">

                    <select
                      value={
                        order.status ||
                        "Pending"
                      }
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border px-4 py-2 rounded-lg"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                    </select>

                    <button
                      onClick={() =>
                        deleteOrder(
                          order._id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete Order
                    </button>

                  </div>

                </div>

                {/* PRODUCTS */}
                <div className="space-y-4">

                  {order.items?.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 border p-4 rounded-lg"
                      >
<img
  src={
    item.image
      ? item.image.startsWith("http")
        ? item.image
        : `${API}/uploads/${item.image}`
      : "/placeholder.jpg"
  }
  alt={item.name}
  className="w-20 h-20 object-cover rounded"
   onError={(e) => {
    console.log("IMAGE FAILED:", imageUrl);
    console.log("RAW IMAGE:", item.image);
console.log("FINAL IMAGE URL:", imageUrl);
    e.target.src = "/placeholder.jpg";
  }}
/>
                      
                        <div className="flex-1">

                          <h3 className="font-semibold text-lg">
                            {item.name}
                          </h3>

                          <p>
                            Size:{" "}
                            {item.size}
                          </p>

                          <p>
                            Qty:{" "}
                            {item.qty}
                          </p>

                        </div>

                        <p className="font-bold text-lg">
                          ₹
                          {item.price *
                            item.qty}
                        </p>

                      </div>
                    )
                  )}

                </div>

                {/* FOOTER */}
                <div className="mt-6 flex justify-between items-center">

                  <div>

                    <p className="text-sm text-gray-500">
                      Order Status
                    </p>

                    <h3 className="text-xl font-bold">
                      {order.status ||
                        "Pending"}
                    </h3>

                  </div>

                  <h2 className="text-2xl font-bold">
                    Total: ₹
                    {order.total}
                  </h2>

                </div>

              </div>
            ))
          ) : (
            <p>No orders found</p>
          )}

        </div>

      </div>
    );
  }