import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/my-bookings/${user.email}`)
                .then(res => res.json())
                .then(data => setBookings(data))
                .catch(err => console.error(err));
        }
    }, [user?.email]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center">
                My Bookings
            </h1>

            {bookings.length === 0 ? (
                <p className="text-center text-gray-500">No bookings yet.</p>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                >
                    {bookings.map((b) => (
                        <motion.div
                            key={b._id}
                            className="rounded-lg shadow-md overflow-hidden bg-sky-50 hover:shadow-xl transition-shadow cursor-pointer"
                            whileHover={{ scale: 1.03 }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <img
                                src={b.image}
                                alt={b.vehicleName}
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-1">{b.vehicleName}</h2>
                                <p className="text-gray-600 mb-1">Price: {b.price}৳</p>
                                <p className="text-gray-600 mb-1">Owner: {b.ownerEmail}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default MyBookings;
