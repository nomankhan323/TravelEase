import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout, googleLogin } = useAuth();

    const handleLogin = async () => {
        try {
            await googleLogin();
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    const navLinks = (
        <>
            <NavLink to="/" className="px-3 py-2">Home</NavLink>
            <NavLink to="/allVehicles" className="px-3 py-2">All Vehicles</NavLink>
            {user && (
                <>
                    <NavLink to="/addVehicle" className="px-3 py-2">Add Vehicle</NavLink>
                    <NavLink to="/myVehicles" className="px-3 py-2">My Vehicles</NavLink>
                    <NavLink to="/myBookings" className="px-3 py-2">My Bookings</NavLink>
                </>
            )}
        </>
    );

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <Link to="/" className="font-bold text-xl">TravelEase</Link>
            <div className="flex gap-4">{navLinks}</div>
            <div>
                {user ? (
                    <div className="flex items-center gap-3">
                        <img src={user.photoURL} alt="user" className="w-8 h-8 rounded-full" />
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                    </div>
                ) : (
                    <button onClick={handleLogin} className="bg-green-500 px-3 py-1 rounded">Login with Google</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
