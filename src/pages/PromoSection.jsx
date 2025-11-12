import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const sliderImages = [
    "https://i.postimg.cc/kGpfrPSZ/pexels-vladimir-konoplev-155326297-10889644.jpg",
    "https://i.postimg.cc/NGSVFZLz/pexels-christianbuergi-13014390.jpg",
    "https://i.postimg.cc/8cyt8KsJ/pexels-rao-qingwei-400570939-16569268.jpg",
];

const topCars = [
    { id: 1, name: "Mercedes-Benz V-Class", price: "$220/day", image: "https://i.postimg.cc/TYg66nfW/pexels-we-packo-1243579214-23230765.jpg" },
    { id: 2, name: "Tesla Model 3", price: "$120/day", image: "https://i.postimg.cc/T1trsK1z/pexels-zion-10029763.jpg" },
    { id: 3, name: "Hyundai H1", price: "$150/day", image: "https://i.postimg.cc/J4wmyphp/pexels-hyundaimotorgroup-29550422.jpg" },
];

const PromoSection = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setIndex((prev) => (prev + 1) % sliderImages.length), 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative mt-16 px-4 sm:px-6 lg:px-12 overflow-hidden">

            {/* Full vibrant animated gradient background */}
            <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Hero section */}
            <div className="max-w-6xl mx-auto rounded-3xl shadow-xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">

                {/* Promo Text */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
                >
                    <motion.h2
                        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                        className="text-3xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-lg"
                    >
                        Travel Smarter with <span className="text-yellow-300">TravelEase</span> 🚘
                    </motion.h2>

                    {/* About / Description Text */}
                    <motion.p
                        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                        className="text-white/90 mb-4 leading-relaxed text-lg"
                    >
                        TravelEase is your ultimate companion for hassle-free vehicle rentals. We provide a wide range of vehicles to fit every journey, from city drives to long road trips. Our platform ensures secure payments, easy booking, and a seamless experience from start to finish.
                    </motion.p>

                    <motion.p
                        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                        className="text-lg text-white/90 mb-6 leading-relaxed"
                    >
                        Discover the best vehicles for your next adventure. From sedans to SUVs, TravelEase makes your trip management smooth and fast.
                    </motion.p>

                    <motion.div
                        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                        className="flex flex-wrap gap-3"
                    >
                        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">🚗 50+ Vehicles</span>
                        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">📅 Easy Booking</span>
                        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">💳 Secure Payments</span>
                    </motion.div>
                </motion.div>

                {/* Hero Slider with fade + scale */}
                <div className="relative flex justify-center items-center">
                    <div className="relative w-72 h-72 md:w-96 md:h-96 overflow-hidden rounded-2xl border-4 border-white/30 shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={sliderImages[index]}
                                src={sliderImages[index]}
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

            {/* Top Cars Section */}
            <section className="max-w-6xl mx-auto mt-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">
                    Top Cars 🚗
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {topCars.map((car, idx) => (
                            <motion.div
                                key={car.id}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
                                }}
                                className="bg-sky-100 rounded-2xl overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-48 md:h-56 object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="font-semibold text-lg">{car.name}</h4>
                                    <p className="text-gray-600 mt-1">{car.price}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>
        </section>
    );
};

export default PromoSection;
