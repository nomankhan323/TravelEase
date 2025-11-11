import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyVehicles = () => {
    const { user } = useAuth();
    const [vehicles, setVehicles] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:5000/my-vehicles/${user.email}`)
            .then(res => res.json())
            .then(data => setVehicles(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        if (user?.email) {
            fetchData();
        }
    }, [user?.email]);

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:5000/delete-vehicle/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();

        if (data.success) {
            toast.success("Vehicle deleted");
            fetchData();
        } else {
            toast.error("Failed to delete");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center">
                My Vehicles
            </h1>

            {vehicles.length === 0 ? (
                <p className="text-center text-gray-500">No vehicles added yet.</p>
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
                            className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-xl transition-shadow cursor-pointer"
                            whileHover={{ scale: 1.03 }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <img
                                src={v.coverImage}
                                alt={v.vehicleName}
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{v.vehicleName}</h2>
                                <div className="flex gap-3 mt-3">
                                    <Link
                                        to={`/updateVehicle/${v._id}`}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(v._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
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
