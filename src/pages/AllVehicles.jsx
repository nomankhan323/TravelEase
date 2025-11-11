import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";

const AllVehicles = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/vehicles")
            .then(res => res.json())
            .then(data => setVehicles(data));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-5">All Vehicles</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vehicles.map(v => (
                    <VehicleCard key={v._id} vehicle={v} />
                ))}
            </div>
        </div>
    );
};

export default AllVehicles;
