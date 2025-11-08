import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="text-center py-10">
            <h1 className="text-4xl font-bold mb-4 text-blue-600">
                Welcome to TravelEase
            </h1>
            <p className="text-gray-600 mb-6">
                Find and manage vehicles for your next trip easily.
            </p>
            <Link
                to="/allVehicles"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
                Explore All Vehicles
            </Link>
        </div>
    );
};

export default Home;
