import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="border p-3 rounded shadow">
            <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-40 object-cover rounded mb-2"
            />

            <h2 className="text-xl font-semibold">{vehicle.vehicleName}</h2>
            <p>Owner: {vehicle.owner}</p>
            <p>Category: {vehicle.category}</p>
            <p>Price: {vehicle.pricePerDay}৳ / day</p>
            <p>Location: {vehicle.location}</p>

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
