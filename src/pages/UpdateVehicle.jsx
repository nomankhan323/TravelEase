import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateVehicle = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/vehicles/${id}`)
            .then(res => res.json())
            .then(data => setVehicle(data));
    }, []);

    const handleChange = (e) => {
        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:5000/update-vehicle/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehicle),
        });

        const data = await res.json();

        if (data.success) {
            toast.success("Vehicle updated!");
        } else {
            toast.error("Failed to update");
        }
    };

    if (!vehicle) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-5">Update Vehicle</h1>

            <form onSubmit={handleUpdate} className="space-y-4 w-1/2">
                <input name="name" value={vehicle.name} onChange={handleChange}
                    className="border p-2 w-full" />

                <input name="image" value={vehicle.image} onChange={handleChange}
                    className="border p-2 w-full" />

                <input name="type" value={vehicle.type} onChange={handleChange}
                    className="border p-2 w-full" />

                <input name="capacity" value={vehicle.capacity} onChange={handleChange}
                    className="border p-2 w-full" />

                <input name="price" value={vehicle.price} onChange={handleChange}
                    className="border p-2 w-full" />

                <button type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded">
                    Update Vehicle
                </button>
            </form>
        </div>
    );
};

export default UpdateVehicle;
