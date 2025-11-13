import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const MyBookings = () => {
    const { user } = useAuth();
    const { dark } = useTheme();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://as-10-backend.vercel.app/my-bookings/${user.email}`)
                .then(res => res.json())
                .then(data => setBookings(data))
                .catch(err => console.error(err));
        }
    }, [user?.email]);

    return (
        <div className={`max-w-7xl mx-auto px-4 py-6 min-h-screen ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <h1 className={`text-3xl md:text-4xl font-bold mb-6 text-center ${dark ? "text-white" : "text-gray-800"}`}>
                My Bookings
            </h1>

            {bookings.length === 0 ? (
                <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    No bookings yet.
                </p>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } },
                    }}
                >
                    {bookings.map((b) => (
                        <motion.div
                            key={b._id}
                            className={`rounded-lg shadow-md overflow-hidden transition-shadow cursor-pointer
                                ${dark ? "bg-gray-800 hover:shadow-lg border border-gray-700" : "bg-sky-50 hover:shadow-xl border border-gray-200"}`}
                            whileHover={{ scale: 1.03 }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <img
                                src={b.image || "https://via.placeholder.com/300x200?text=No+Image"}
                                alt={b.vehicleName || "Booking Vehicle"}
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className={`text-xl font-semibold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
                                    {b.vehicleName || "Unnamed Vehicle"}
                                </h2>
                                <p className={`mb-1 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                                    Price: {b.price}৳
                                </p>
                                <p className={`mb-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                    Owner: {b.ownerEmail || "N/A"}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default MyBookings;
