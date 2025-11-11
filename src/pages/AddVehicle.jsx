import { useState } from "react";
import toast from "react-hot-toast";

const AddVehicle = () => {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        type: "",
        capacity: "",
        price: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/add-vehicle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.success) {
            toast.success("Vehicle added successfully!");
            setFormData({ name: "", image: "", type: "", capacity: "", price: "" });
        } else {
            toast.error("Failed to add vehicle");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-5">Add a New Vehicle</h1>

            <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
                <input name="name" value={formData.name} onChange={handleChange}
                    placeholder="Vehicle Name" className="border p-2 w-full" required />

                <input name="image" value={formData.image} onChange={handleChange}
                    placeholder="Image URL" className="border p-2 w-full" required />

                <input name="type" value={formData.type} onChange={handleChange}
                    placeholder="Type (Car, Bike, Bus)" className="border p-2 w-full" required />

                <input name="capacity" value={formData.capacity} onChange={handleChange}
                    placeholder="Capacity" className="border p-2 w-full" required />

                <input name="price" value={formData.price} onChange={handleChange}
                    placeholder="Price per day" className="border p-2 w-full" required />

                <button type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add Vehicle
                </button>
            </form>
        </div>
    );
};

export default AddVehicle;
