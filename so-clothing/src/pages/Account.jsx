import {
  Navigate,
} from "react-router-dom";

import {
  LogOut,
  Package,
  Heart,
  MapPin,
  CreditCard,
} from "lucide-react";

import {
  useAuth,
} from "@/contexts/AuthContext";

import {
  PageHeader,
} from "@/components/site/PageHeader";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function Account() {

  const { user, logout } =
    useAuth();
  const API = import.meta.env.VITE_API_URL || "https://sooclothing-1.onrender.com";;
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  if (!user)
    return (
      <Navigate
        to="/login"
        replace
      />
    );

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        `${API}/api/orders`
      );

      // FILTER CURRENT USER ORDERS
      const userOrders =
        res.data.filter(
          (order) =>
            order.userEmail ===
            user.email
        );

      setOrders(userOrders);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <>

      <PageHeader
        eyebrow={`Welcome, ${user.name}`}
        title="Account"
      />

      <section className="py-16 lg:py-24">

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-4 gap-12">

          {/* SIDEBAR */}
          <aside className="space-y-1 lg:sticky lg:top-28 lg:self-start">

            <SideItem
              icon={
                <Package className="w-4 h-4" />
              }
              label="Orders"
              active
            />

            <SideItem
              icon={
                <Heart className="w-4 h-4" />
              }
              label="Wishlist"
            />

            <SideItem
              icon={
                <MapPin className="w-4 h-4" />
              }
              label="Addresses"
            />

            <SideItem
              icon={
                <CreditCard className="w-4 h-4" />
              }
              label="Payment"
            />

            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors mt-6 border-t border-border pt-6"
            >

              <LogOut className="w-4 h-4" />

              Log out

            </button>

          </aside>

          {/* CONTENT */}
          <div className="lg:col-span-3 space-y-12">

            {/* PROFILE */}
            <div>

              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-3">
                — Profile
              </p>

              <div className="grid sm:grid-cols-2 gap-6 bg-secondary p-8">

                <Info
                  label="Name"
                  value={user.name}
                />

                <Info
                  label="Email"
                  value={user.email}
                />

              </div>

            </div>

            {/* ORDERS */}
            <div>

              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-3">
                — My Orders
              </p>

              {loading ? (

                <p>Loading orders...</p>

              ) : orders.length === 0 ? (

                <div className="border border-border p-8">

                  <p>
                    No orders found
                  </p>

                </div>

              ) : (

                <div className="space-y-8">

                  {orders.map((order) => (

                    <div
                      key={order._id}
                      className="border border-border p-6"
                    >

                      {/* ORDER HEADER */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                        <div>

                          <h2 className="font-display text-2xl uppercase">
                            Order
                          </h2>

                          <p className="font-mono text-sm text-muted-foreground">
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                            Status
                          </p>

                          <span className="text-accent font-mono text-sm uppercase tracking-widest">
                            {order.status ||
                              "Pending"}
                          </span>

                        </div>

                      </div>

                      {/* PRODUCTS */}
                      <div className="space-y-4">

                        {order.items?.map(
                          (
                            item,
                            index
                          ) => (

                            <div
                              key={index}
                              className="flex items-center gap-4 border border-border p-4"
                            >

                             <img
  src={item.image}
  alt={item.name}
  className="w-20 h-20 object-cover"
/>

                              <div className="flex-1">

                                <h3 className="font-display uppercase text-lg">
                                  {item.name}
                                </h3>

                                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                  Size:{" "}
                                  {item.size}
                                </p>

                                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                  Qty:{" "}
                                  {item.qty}
                                </p>

                              </div>

                              <p className="font-mono text-sm">
                                ₹
                                {item.price *
                                  item.qty}
                              </p>

                            </div>
                          )
                        )}

                      </div>

                      {/* TOTAL */}
                      <div className="mt-6 flex justify-end">

                        <h3 className="font-display text-2xl uppercase">
                          Total: ₹
                          {order.total}
                        </h3>

                      </div>

                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>

        </div>

      </section>

    </>
  );
}

function SideItem({
  icon,
  label,
  active,
}) {

  return (

    <div
      className={`flex items-center gap-3 px-4 py-3 font-mono text-xs uppercase tracking-widest cursor-pointer transition-colors ${
        active
          ? "bg-secondary text-foreground border-l-2 border-accent"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >

      {icon}

      {label}

    </div>
  );
}

function Info({
  label,
  value,
}) {

  return (

    <div>

      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
        {label}
      </p>

      <p className="font-display uppercase">
        {value}
      </p>

    </div>
  );
}