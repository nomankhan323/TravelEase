import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { dark, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                    ? "backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-md"
                    : "bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500"
                    } text-white dark:text-white`}
            >
                <div className="flex justify-between items-center h-14 px-4 md:px-12 lg:px-20">
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Link
                            to="/"
                            className="text-2xl md:text-3xl font-bold text-yellow-500 drop-shadow-lg hover:text-sky-200 transition"
                        >
                            Travel
                            <span className="text-orange-500 hover:text-sky-300">Ease</span>
                        </Link>
                    </motion.div>

                    <div className="hidden md:flex gap-10 flex-1 justify-center">
                        {navItems.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `relative px-3 py-2 text-sm font-medium transition ${isActive ? "text-sky-400" : "hover:text-sky-300"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden md:flex gap-4 items-center">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-white/20 dark:bg-gray-700 transition"
                            title="Toggle Theme"
                        >
                            {dark ? (
                                <SunIcon className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <MoonIcon className="w-5 h-5 text-gray-900" />
                            )}
                        </button>

                        {user ? (
                            <>
                                <div className="relative group">
                                    <img
                                        src={user.photoURL || "/defaultUser.png"}
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
                                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm font-medium transition"
                                >
                                    Logout
                                </motion.button>
                            </>
                        ) : (
                            <div className="flex gap-3">
                                <Link
                                    to="/login"
                                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-sm font-medium transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md text-sm font-medium transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

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

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden bg-white dark:bg-gray-900 overflow-hidden"
                        >
                            <div className="flex flex-col items-center gap-2 py-2">
                                {navItems.map(({ to, label }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `px-4 py-2 w-full text-center font-medium transition ${isActive ? "text-sky-400" : "hover:text-sky-300"
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
                                        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-sm font-medium mt-2 w-11/12"
                                    >
                                        Logout
                                    </motion.button>
                                ) : (
                                    <div className="flex flex-col gap-2 w-full items-center mt-2">
                                        <Link
                                            to="/login"
                                            onClick={() => setMenuOpen(false)}
                                            className="w-11/12 text-center bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md text-sm font-medium"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setMenuOpen(false)}
                                            className="w-11/12 text-center bg-green-500 hover:bg-green-600 px-4 py-1 rounded-md text-sm font-medium"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Spacer */}
            <div className="mt-[64px]"></div>
        </>
    );
};

export default Navbar;
