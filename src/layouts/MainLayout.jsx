import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

const MainLayout = () => {
    const { dark } = useTheme();

    return (
        <div
            className={`min-h-screen flex flex-col ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
                } transition-colors duration-300`}
        >
            <Navbar />
            <main className="flex-grow container mx-auto p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
