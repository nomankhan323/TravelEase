import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";

const AllVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/vehicles")
            .then(res => res.json())
            .then(data => {
                setVehicles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10">Loading vehicles...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">All Vehicles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map(vehicle => (
                    <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
};

export default AllVehicles;
