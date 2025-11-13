import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const VehicleCard = ({ vehicle }) => {
    const { dark } = useTheme();

    return (
        <motion.div
            className={`rounded-lg overflow-hidden shadow-md transition-shadow duration-300
                ${dark ? "bg-gray-800 text-white hover:shadow-lg" : "bg-sky-50 text-gray-900 hover:shadow-xl"}`}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <img
                src={vehicle.coverImage || vehicle.image}
                alt={vehicle.vehicleName || vehicle.name}
                className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4">
                <h2 className={`text-xl font-semibold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
                    {vehicle.vehicleName || vehicle.name}
                </h2>
                <p className={`text-sm mb-1 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                    Owner: {vehicle.owner || "N/A"}
                </p>
                <p className={`text-sm mb-1 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                    Category: {vehicle.category || "N/A"}
                </p>
                <p className={`font-semibold mb-1 ${dark ? "text-gray-100" : "text-gray-800"}`}>
                    Price: {vehicle.pricePerDay || vehicle.price}৳ / day
                </p>
                <p className={`text-sm mb-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                    Location: {vehicle.location || "N/A"}
                </p>

                <Link
                    to={`/vehicle/${vehicle._id}`}
                    className="inline-block px-5 py-2.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 
                               text-white font-semibold rounded-lg shadow-md hover:from-sky-600 hover:via-indigo-600 hover:to-purple-700
                               transition-all duration-300"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default VehicleCard;
