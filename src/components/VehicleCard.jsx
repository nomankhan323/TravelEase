import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const VehicleCard = ({ vehicle }) => {
    return (
        <motion.div
            className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{vehicle.vehicleName}</h2>
                <p className="text-gray-600 text-sm mb-1">Owner: {vehicle.owner}</p>
                <p className="text-gray-600 text-sm mb-1">Category: {vehicle.category}</p>
                <p className="text-gray-800 font-semibold mb-1">
                    Price: {vehicle.pricePerDay}৳ / day
                </p>
                <p className="text-gray-600 text-sm mb-2">Location: {vehicle.location}</p>

                <Link
                    to={`/vehicle/${vehicle._id}`}
                    className="inline-block px-5 py-2.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-sky-600 hover:via-indigo-600 hover:to-purple-700 transition-all duration-300"
                >
                    View Details
                </Link>

            </div>
        </motion.div>
    );
};

export default VehicleCard;
