import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Form state
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

    // Handle change
    const handleChange = (e) => {
        setVehicleData({
            ...vehicleData,
            [e.target.name]: e.target.value
        });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login first!");
            return;
        }

        const finalData = { ...vehicleData, userEmail: user.email };

        try {
            const res = await fetch("http://localhost:5000/add-vehicle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-5">Add New Vehicle</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

                <input
                    type="text"
                    name="vehicleName"
                    placeholder="Vehicle Name"
                    className="border p-2 rounded"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="owner"
                    placeholder="Owner Name"
                    className="border p-2 rounded"
                    onChange={handleChange}
                    required
                />

                <select
                    name="category"
                    className="border p-2 rounded"
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
                    className="border p-2 rounded"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="border p-2 rounded"
                    onChange={handleChange}
                    required
                />

                <select
                    name="availability"
                    className="border p-2 rounded"
                    onChange={handleChange}
                >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                </select>

                <textarea
                    name="description"
                    placeholder="Description"
                    className="border p-2 rounded"
                    rows="4"
                    onChange={handleChange}
                    required
                ></textarea>

                <input
                    type="text"
                    name="coverImage"
                    placeholder="Vehicle Image URL"
                    className="border p-2 rounded"
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded"
                >
                    Add Vehicle
                </button>

            </form>
        </div>
    );
};

export default AddVehicle;
