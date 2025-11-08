
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const links = (
        <>
            <NavLink to="/" className="hover:text-blue-500 px-3">Home</NavLink>
            <NavLink to="/allVehicles" className="hover:text-blue-500 px-3">All Vehicles</NavLink>
            {user && (
                <>
                    <NavLink to="/addVehicle" className="hover:text-blue-500 px-3">Add Vehicle</NavLink>
                    <NavLink to="/myVehicles" className="hover:text-blue-500 px-3">My Vehicles</NavLink>
                    <NavLink to="/myBookings" className="hover:text-blue-500 px-3">My Bookings</NavLink>
                </>
            )}
        </>
    );

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    TravelEase
                </Link>

                <div className="hidden md:flex items-center gap-4">{links}</div>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <img
                                src={user.photoURL}
                                alt="User"
                                title={user.displayName}
                                className="w-10 h-10 rounded-full border"
                            />
                            <button
                                onClick={logOut}
                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
