import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VehicleDetails = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/vehicles/${id}`)
            .then((res) => res.json())
            .then((data) => setVehicle(data));
    }, [id]);

    if (!vehicle) return <p>Loading...</p>;

    return (
        <div>
            <img src={vehicle.image} className="w-full h-60 object-cover rounded" />

            <h1 className="text-3xl font-bold mt-4">{vehicle.name}</h1>
            <p>Type: {vehicle.type}</p>
            <p>Capacity: {vehicle.capacity}</p>
            <p>Price: ${vehicle.price}</p>
        </div>
    );
};

export default VehicleDetails;
