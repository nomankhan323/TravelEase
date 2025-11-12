import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4">
            <motion.h1
                className="text-6xl md:text-8xl font-extrabold mb-6 drop-shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            >
                404
            </motion.h1>
            <motion.p
                className="text-xl md:text-2xl mb-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                Oops! Page not found.
            </motion.p>
            <motion.img
                src="https://i.postimg.cc/7YZ9QZfq/404-illustration.png"
                alt="404 illustration"
                className="w-64 md:w-96 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <Link
                    to="/"
                    className="bg-white text-purple-600 font-bold px-6 py-3 rounded-full hover:bg-purple-100 transition"
                >
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
