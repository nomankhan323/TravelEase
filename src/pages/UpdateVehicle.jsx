import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const UpdateVehicle = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/vehicle/${id}`)
            .then((res) => res.json())
            .then((data) => setVehicle(data))
            .catch((err) => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:5000/update-vehicle/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehicle),
        });

        const data = await res.json();
        if (data.success) toast.success("Updated successfully");
        else toast.error("Update failed");
    };

    if (!vehicle)
        return (
            <p className="text-center text-gray-500 mt-10 text-lg">Loading...</p>
        );

    return (
        <motion.div
            className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                Update Vehicle
            </h1>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">
                <input
                    name="vehicleName"
                    value={vehicle.vehicleName}
                    onChange={handleChange}
                    placeholder="Vehicle Name"
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <input
                    name="owner"
                    value={vehicle.owner}
                    onChange={handleChange}
                    placeholder="Owner Name"
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <input
                    name="category"
                    value={vehicle.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <input
                    name="pricePerDay"
                    value={vehicle.pricePerDay}
                    onChange={handleChange}
                    placeholder="Price per Day"
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <input
                    name="location"
                    value={vehicle.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <input
                    name="availability"
                    value={vehicle.availability}
                    onChange={handleChange}
                    placeholder="Availability"
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <textarea
                    name="description"
                    value={vehicle.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows="4"
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <input
                    name="coverImage"
                    value={vehicle.coverImage}
                    onChange={handleChange}
                    placeholder="Cover Image URL"
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition-all duration-300"
                >
                    Update Vehicle
                </button>

            </form>
        </motion.div>
    );
};

export default UpdateVehicle;
