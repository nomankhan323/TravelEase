import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
    "https://i.postimg.cc/kGpfrPSZ/pexels-vladimir-konoplev-155326297-10889644.jpg",
    "https://i.postimg.cc/NGSVFZLz/pexels-christianbuergi-13014390.jpg",
    "https://i.postimg.cc/1zm7bQYS/pexels-jarod-16558172.jpg",
];

const PromoSection = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative mt-16 px-6 py-12 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 text-white overflow-hidden rounded-3xl shadow-xl max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">

                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="z-10"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Travel Smarter with <span className="text-yellow-300">TravelEase</span> 🚘
                    </h2>
                    <p className="text-lg text-white/90 mb-6 leading-relaxed">
                        Discover the best vehicles for your next adventure.
                        From sedans to SUVs, TravelEase makes your trip management smooth and fast.
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">🚗 50+ Vehicles</span>
                        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">📅 Easy Booking</span>
                        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">💳 Secure Payments</span>
                    </div>
                </motion.div>

                <div className="relative flex justify-center items-center">
                    <div className="relative w-72 h-72 md:w-96 md:h-96 overflow-hidden rounded-2xl border-4 border-white/30 shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={images[index]}
                                src={images[index]}
                                alt="TravelEase mockup"
                                className="object-cover w-full h-full"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8 }}
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoSection;
