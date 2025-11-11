const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-sky-700 mb-3 drop-shadow-sm">
                Welcome to <span className="text-indigo-700">TravelEase 🚗</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-md mb-6">
                Book vehicles, manage trips, and travel with ease — anytime, anywhere!
            </p>
        </div>
    );
};

export default Home;
