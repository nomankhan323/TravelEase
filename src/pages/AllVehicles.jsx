import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import { useTheme } from "../context/ThemeContext";

const AllVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { dark } = useTheme();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await fetch("https://as-10-backend.vercel.app/vehicles");
                const data = await res.json();

                if (Array.isArray(data)) {
                    setVehicles(data);
                } else {
                    setVehicles([]);
                    console.warn("⚠️ Vehicles data is not an array:", data);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch vehicles.");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    if (loading) return (
        <p className={`text-center mt-10 ${dark ? "text-white" : "text-gray-800"}`}>
            Loading vehicles...
        </p>
    );

    if (error) return (
        <p className="text-center mt-10 text-red-500">{error}</p>
    );

    if (!vehicles || vehicles.length === 0) return (
        <p className={`text-center mt-10 ${dark ? "text-white/80" : "text-gray-700"}`}>
            No vehicles available.
        </p>
    );

    return (
        <div className={`container mx-auto p-4 ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
            <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
                All Vehicles
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map(vehicle => (
                    <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
};

export default AllVehicles;
