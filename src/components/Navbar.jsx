import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { user, logout, googleLogin } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            setMenuOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/allVehicles", label: "All Vehicles" },
        ...(user
            ? [
                { to: "/addVehicle", label: "Add Vehicle" },
                { to: "/myVehicles", label: "My Vehicles" },
                { to: "/myBookings", label: "My Bookings" },
            ]
            : []),
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
                    ? "backdrop-blur-md bg-blue-900/70 shadow-md"
                    : "bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500"
                    } text-white`}
            >
                <div className="flex justify-between items-center h-14 px-3 md:px-4">

                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Link
                            to="/"
                            className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg hover:text-sky-300 transition"
                        >
                            TravelEase
                        </Link>
                    </motion.div>

                    <div className="hidden md:flex gap-3">
                        {navItems.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `relative px-2 py-2 text-sm font-medium transition ${isActive ? "text-sky-400" : "hover:text-sky-300"
                                    }`
                                }
                            >
                                {label}
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-sky-400 transition-all duration-300 hover:w-full"></span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        {user ? (
                            <>
                                <div className="relative group hidden md:block">
                                    <img
                                        src={user.photoURL}
                                        alt="User"
                                        className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                                    />
                                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-white text-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                                        {user.displayName || "User"}
                                    </span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm font-medium transition hidden md:block"
                                >
                                    Logout
                                </motion.button>
                            </>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogin}
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-md text-sm font-medium transition hidden md:block"
                            >
                                Login with Google
                            </motion.button>
                        )}

                        <button
                            className="md:hidden focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <span
                                className={`block w-6 h-0.5 bg-white mb-1 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
                                    }`}
                            ></span>
                            <span
                                className={`block w-6 h-0.5 bg-white mb-1 transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"
                                    }`}
                            ></span>
                            <span
                                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                                    }`}
                            ></span>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden bg-blue-700 overflow-hidden"
                        >
                            <div className="flex flex-col items-center gap-2 py-2">
                                {navItems.map(({ to, label }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `px-4 py-2 w-full text-center text-white font-medium transition ${isActive ? "text-sky-400" : "hover:text-sky-300"
                                            }`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                ))}

                                {user ? (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleLogout}
                                        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-sm font-medium mt-2"
                                    >
                                        Logout
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleLogin}
                                        className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-md text-sm font-medium mt-2"
                                    >
                                        Login with Google
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            <div className="mt-[64px] sm:mt-[56px] md:mt-[64px] lg:mt-[64px]"></div>
        </>
    );
};

export default Navbar;
