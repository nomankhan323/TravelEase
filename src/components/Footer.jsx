
const Footer = () => {
    return (
        <footer className="bg-gray-100 text-center py-6 mt-8 border-t">
            <h2 className="text-xl font-semibold text-blue-600">TravelEase</h2>
            <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} TravelEase — All Rights Reserved
            </p>
            <div className="flex justify-center gap-4 mt-3">
                <a href="#" className="hover:text-blue-500">Facebook</a>
                <a href="#" className="hover:text-blue-500">Instagram</a>
                <a href="#" className="hover:text-blue-500">X</a>
            </div>
        </footer>
    );
};
export default Footer;
