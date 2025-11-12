import { useEffect, useState } from "react";
import PromoSection from "./PromoSection";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
];

const Home = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-6xl mt-12 rounded-3xl overflow-hidden shadow-2xl border border-white/30">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={images[current]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${images[current]})` }}
                    ></motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>

                <div className="relative z-10 text-center text-white px-6 py-20 md:py-28">
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-6xl font-extrabold mb-4 drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)]"
                    >
                        Welcome to <span className="text-yellow-300">TravelEase 🚗</span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg sm:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
                    >
                        Discover, book, and explore vehicles with ease — your smooth journey
                        starts here.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-8 py-3 rounded-full text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                    >
                        Explore Vehicles
                    </motion.button>
                </div>
            </div>

            <PromoSection />
        </div>
    );
};

export default Home;
