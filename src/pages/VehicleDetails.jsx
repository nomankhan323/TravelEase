import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const VehicleDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/vehicle/${id}`)
            .then(res => res.json())
            .then(data => setVehicle(data));
    }, [id]);

    const handleBooking = async () => {
        if (!user) return toast.error("Please login to book");

        const booking = {
            vehicleId: id,
            vehicleName: vehicle.vehicleName,
            price: vehicle.pricePerDay,
            ownerEmail: vehicle.userEmail,
            userEmail: user.email,
            userName: user.displayName,
            image: vehicle.coverImage,
        };

        const res = await fetch("http://localhost:5000/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking)
        });

        const data = await res.json();

        if (data.success) toast.success("Booking Successful!");
        else toast.error("Booking Failed");
    };

    if (!vehicle) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-80 object-cover rounded"
            />
            <h1 className="text-3xl font-bold mt-4">{vehicle.vehicleName}</h1>
            <p>Owner: {vehicle.owner}</p>
            <p>Category: {vehicle.category}</p>
            <p>Price Per Day: {vehicle.pricePerDay}৳</p>
            <p>Location: {vehicle.location}</p>
            <p className="mt-2">{vehicle.description}</p>

            <button
                onClick={handleBooking}
                className="bg-green-600 text-white px-5 py-2 mt-5 rounded"
            >
                Book Now
            </button>
        </div>
    );
};

export default VehicleDetails;
