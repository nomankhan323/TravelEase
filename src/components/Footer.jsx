import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.footer
            className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 text-white mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">TravelEase</h2>
                    <p className="text-blue-100 text-sm md:text-base">
                        Book vehicles, manage trips, and travel with ease. Your reliable platform for smooth journeys.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        {["Home", "All Vehicles", "Add Vehicle", "My Vehicles", "My Bookings"].map((link, i) => (
                            <motion.li
                                key={i}
                                whileHover={{ x: 5, color: "#e0f2fe" }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <a href={`/${link.replace(/\s+/g, '')}`} className="transition-colors">
                                    {link}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3">Follow Us</h3>
                    <div className="flex gap-4 text-lg">
                        {[
                            { icon: <FaFacebookF />, link: "#" },
                            { icon: <FaTwitter />, link: "#" },
                            { icon: <FaInstagram />, link: "#" },
                            { icon: <FaLinkedinIn />, link: "#" },
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.link}
                                whileHover={{ scale: 1.2, color: "#e0f2fe" }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>

            </div>

            <div className="border-t border-blue-500 text-center py-4 text-sm md:text-base text-blue-100">
                © {new Date().getFullYear()} TravelEase. All rights reserved.
            </div>
        </motion.footer>
    );
};

export default Footer;
