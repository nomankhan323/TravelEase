import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateVehicle = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/vehicle/${id}`)
            .then(res => res.json())
            .then(data => setVehicle(data));
    }, [id]);

    const handleChange = e => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleUpdate = async e => {
        e.preventDefault();
        const res = await fetch(`http://localhost:5000/update-vehicle/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehicle)
        });

        const data = await res.json();
        if (data.success) toast.success("Updated successfully");
        else toast.error("Update failed");
    };

    if (!vehicle) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Update Vehicle</h1>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">
                <input
                    name="vehicleName"
                    value={vehicle.vehicleName}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="owner"
                    value={vehicle.owner}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="category"
                    value={vehicle.category}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="pricePerDay"
                    value={vehicle.pricePerDay}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="location"
                    value={vehicle.location}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    name="availability"
                    value={vehicle.availability}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <textarea
                    name="description"
                    value={vehicle.description}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    rows="4"
                ></textarea>
                <input
                    name="coverImage"
                    value={vehicle.coverImage}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-green-600 text-white p-2 rounded"
                >
                    Update Vehicle
                </button>
            </form>
        </div>
    );
};

export default UpdateVehicle;
