import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="border p-3 rounded shadow">
            <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-40 object-cover rounded mb-2"
            />

            <h2 className="text-xl font-semibold">{vehicle.name}</h2>
            <p>Type: {vehicle.type}</p>
            <p>Capacity: {vehicle.capacity}</p>
            <p>Price: ${vehicle.price}</p>

            <Link
                to={`/vehicle/${vehicle._id}`}
                className="mt-2 inline-block text-blue-600 underline"
            >
                View Details
            </Link>
        </div>
    );
};

export default VehicleCard;
