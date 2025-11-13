import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyVehicles = () => {
    const { user } = useAuth();
    const { dark } = useTheme();
    const [vehicles, setVehicles] = useState([]);

    const fetchData = async () => {
        try {
            const res = await fetch(`https://as-10-backend.vercel.app/my-vehicles/${user.email}`);
            const data = await res.json();
            setVehicles(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user?.email) fetchData();
    }, [user?.email]);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://as-10-backend.vercel.app/delete-vehicle/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Vehicle deleted");
                fetchData();
            } else {
                toast.error("Failed to delete");
            }
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className={`max-w-7xl mx-auto px-4 py-6 min-h-screen ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <h1 className={`text-3xl md:text-4xl font-bold mb-6 text-center ${dark ? "text-white" : "text-gray-800"}`}>
                My Vehicles
            </h1>

            {vehicles.length === 0 ? (
                <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    No vehicles added yet.
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
                    {vehicles.map((v) => (
                        <motion.div
                            key={v._id}
                            className={`border rounded-lg shadow-md overflow-hidden transition-shadow cursor-pointer
                                ${dark ? "bg-gray-800 hover:shadow-lg border-gray-700" : "bg-sky-50 hover:shadow-xl border-gray-200"}`}
                            whileHover={{ scale: 1.03 }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <img
                                src={v.coverImage || "https://via.placeholder.com/300x200?text=No+Image"}
                                alt={v.vehicleName || "Vehicle"}
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className={`text-xl font-semibold mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
                                    {v.vehicleName || "Unnamed Vehicle"}
                                </h2>
                                <div className="flex gap-3 mt-3">
                                    <Link
                                        to={`/updateVehicle/${v._id}`}
                                        className={`px-3 py-1 rounded font-semibold transition-colors
                                            ${dark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(v._id)}
                                        className={`px-3 py-1 rounded font-semibold transition-colors
                                            ${dark ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-600 text-white hover:bg-red-700"}`}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default MyVehicles;
