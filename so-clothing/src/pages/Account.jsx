// Account.jsx
import { Navigate } from "react-router-dom";
import { LogOut, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/site/PageHeader";
import { useEffect, useState } from "react";
import axios from "axios";

// Google Fonts injection
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector('[href*="Cormorant"]')) {
  document.head.appendChild(fontLink);
}

export default function Account() {
  const { user, logout } = useAuth();
  const API = import.meta.env.VITE_API_URL || "https://sooclothing-pw64.vercel.app"
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user) return <Navigate to="/login" replace />;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/api/orders`);
      const userOrders = res.data.filter((order) => order.userEmail === user.email);
      setOrders(userOrders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow={`Welcome, ${user.name}`} title="Account" />

      <section className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-4 gap-12">

          {/* SIDEBAR */}
          <aside className="space-y-1 lg:sticky lg:top-28 lg:self-start">
            <SideItem icon={<Package className="w-4 h-4" />} label="Orders" active />

            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full hover:text-accent transition-colors mt-6 border-t border-border pt-6 text-muted-foreground"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 400,
              }}
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </aside>

          {/* CONTENT */}
          <div className="lg:col-span-3 space-y-12">

            {/* PROFILE */}
            <div>
              <p
                className="text-accent mb-3 uppercase"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.25em",
                  fontWeight: 500,
                }}
              >
                — Profile
              </p>

              <div className="grid sm:grid-cols-2 gap-6 bg-secondary p-8">
                <Info label="Name" value={user.name} />
                <Info label="Email" value={user.email} />
              </div>
            </div>

            {/* ORDERS */}
            <div>
              <p
                className="text-accent mb-3 uppercase"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.25em",
                  fontWeight: 500,
                }}
              >
                — My Orders
              </p>

              {loading ? (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 300,
                  }}
                >
                  Loading orders...
                </p>
              ) : orders.length === 0 ? (
                <div className="border border-border p-8">
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 300,
                    }}
                  >
                    No orders found
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-border p-6">

                      {/* ORDER HEADER */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                          <h2
                            className="uppercase leading-[0.9]"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                              fontWeight: 700,
                              letterSpacing: "-0.01em",
                            }}
                          >
                            Order
                          </h2>
                          <p
                            className="text-muted-foreground mt-1"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.75rem",
                              fontWeight: 300,
                              letterSpacing: "0.05em",
                            }}
                          >
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p
                            className="text-muted-foreground uppercase mb-1"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.62rem",
                              letterSpacing: "0.3em",
                              fontWeight: 400,
                            }}
                          >
                            Status
                          </p>
                          <span
                            className="text-accent uppercase"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.72rem",
                              letterSpacing: "0.3em",
                              fontWeight: 500,
                            }}
                          >
                            {order.status || "Pending"}
                          </span>
                        </div>
                      </div>

                      {/* PRODUCTS */}
                      <div className="space-y-4">
                        {order.items?.map((item, index) => (
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
                              <h3
                                className="uppercase"
                                style={{
                                  fontFamily: "'Cormorant Garamond', serif",
                                  fontSize: "1.1rem",
                                  fontWeight: 600,
                                  letterSpacing: "0.01em",
                                }}
                              >
                                {item.name}
                              </h3>
                              <p
                                className="text-muted-foreground uppercase mt-1"
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: "0.62rem",
                                  letterSpacing: "0.2em",
                                  fontWeight: 400,
                                }}
                              >
                                Size: {item.size}
                              </p>
                              <p
                                className="text-muted-foreground uppercase"
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: "0.62rem",
                                  letterSpacing: "0.2em",
                                  fontWeight: 400,
                                }}
                              >
                                Qty: {item.qty}
                              </p>
                            </div>

                            <p
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.9rem",
                                fontWeight: 500,
                              }}
                            >
                              ₹{item.price * item.qty}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* TOTAL */}
                      <div className="mt-6 flex justify-end">
                        <h3
                          className="uppercase"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          Total: ₹{order.total}
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

function SideItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors uppercase ${
        active
          ? "bg-secondary text-foreground border-l-2 border-accent"
          : "text-muted-foreground hover:text-foreground"
      }`}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.62rem",
        letterSpacing: "0.3em",
        fontWeight: 400,
      }}
    >
      {icon}
      {label}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p
        className="text-muted-foreground uppercase mb-1"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          fontWeight: 400,
        }}
      >
        {label}
      </p>
      <p
        className="uppercase"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.15rem",
          fontWeight: 600,
          letterSpacing: "0.01em",
        }}
      >
        {value}
      </p>
    </div>
  );
}