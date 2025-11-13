import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AddVehicle = () => {
    const { user } = useAuth();
    const { dark } = useTheme();
    const navigate = useNavigate();

    const [vehicleData, setVehicleData] = useState({
        vehicleName: "",
        owner: "",
        category: "",
        pricePerDay: "",
        location: "",
        availability: "Available",
        description: "",
        coverImage: "",
        userEmail: user?.email || ""
    });

    const handleChange = (e) => {
        setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login first!");
            return;
        }

        const finalData = { ...vehicleData, userEmail: user.email };

        try {
            const res = await fetch("https://as-10-backend.vercel.app/add-vehicle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            });

            const data = await res.json();
            if (data.success) {
                toast.success("Vehicle Added Successfully!");
                navigate("/myVehicles");
            } else {
                toast.error("Failed to add vehicle");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.error(err);
        }
    };

    const inputBg = dark ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-blue-400"
        : "bg-white text-gray-900 placeholder-gray-700 border-gray-300 focus:ring-blue-400";

    const cardBg = dark ? "bg-gray-800 text-white" : "bg-sky-50 text-gray-900";

    return (
        <motion.div
            className={`max-w-3xl mx-auto p-6 rounded-lg shadow-lg mt-6 ${cardBg}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${dark ? "text-white" : "text-gray-800"}`}>
                Add New Vehicle
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    name="vehicleName"
                    placeholder="Vehicle Name"
                    className={`border p-3 rounded focus:outline-none focus:ring-2 transition ${inputBg}`}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="owner"
                    placeholder="Owner Name"
                    className={`border p-3 rounded focus:outline-none focus:ring-2 transition ${inputBg}`}
                    onChange={handleChange}
                    required
                />

                <select
                    name="category"
                    className={`border p-3 rounded focus:outline-none focus:ring-2 transition ${inputBg}`}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Electric">Electric</option>
                    <option value="Van">Van</option>
                </select>

                <input
                    type="number"
                    name="pricePerDay"
                    placeholder="Price Per Day"
                    className={`border p-3 rounded focus:outline-none focus:ring-2 transition ${inputBg}`}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className={`border p-3 rounded focus:outline-none focus:ring-2 transition ${inputBg}`}
                    onChange={handleChange}
                    required
                />

                <select
                    name="availability"
                    className={`border p-3 rounded focus:outline-none focus:ring-2 transition ${inputBg}`}
                    onChange={handleChange}
                >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                </select>

                <textarea
                    name="description"
                    placeholder="Description"
                    className={`border p-3 rounded focus:outline-none focus:ring-2 transition ${inputBg}`}
                    rows="4"
                    onChange={handleChange}
                    required
                ></textarea>

                <input
                    type="text"
                    name="coverImage"
                    placeholder="Vehicle Image URL"
                    className={`border p-3 rounded focus:outline-none focus:ring-2 transition ${inputBg}`}
                    onChange={handleChange}
                    required
                />

                <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600
                        text-white py-3 px-6 rounded font-semibold shadow-md
                        hover:from-sky-600 hover:via-indigo-600 hover:to-purple-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Add Vehicle
                </motion.button>
            </form>
        </motion.div>
    );
};

export default AddVehicle;
