import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const VehicleDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/vehicle/${id}`)
            .then((res) => res.json())
            .then((data) => setVehicle(data))
            .catch((err) => console.error(err));
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

        try {
            const res = await fetch("http://localhost:5000/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(booking),
            });

            const data = await res.json();

            if (data.success) toast.success("Booking Successful!");
            else toast.error("Booking Failed");
        } catch (err) {
            toast.error("Something went wrong!");
            console.error(err);
        }
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
            <motion.img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-80 object-cover rounded"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            />

            <h1 className="text-3xl font-bold mt-4 text-gray-800">
                {vehicle.vehicleName}
            </h1>
            <p className="text-gray-600 mt-1">Owner: {vehicle.owner}</p>
            <p className="text-gray-600">Category: {vehicle.category}</p>
            <p className="text-gray-600">Price Per Day: {vehicle.pricePerDay}৳</p>
            <p className="text-gray-600">Location: {vehicle.location}</p>
            <p className="text-gray-700 mt-3">{vehicle.description}</p>

            <button
                onClick={handleBooking}
                className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 
               hover:from-sky-600 hover:via-indigo-600 hover:to-purple-700 
               text-white px-6 py-2 mt-5 rounded font-semibold 
               shadow-md transition-all duration-300"
            >
                Book Now
            </button>

        </motion.div>
    );
};

export default VehicleDetails;
