import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/my-bookings/${user.email}`)
            .then(res => res.json())
            .then(data => setBookings(data));
    }, [user.email]);

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map(b => (
                    <div key={b._id} className="border p-4 rounded shadow">
                        <img src={b.image} className="w-full h-40 object-cover rounded" />
                        <h2 className="text-xl font-bold">{b.vehicleName}</h2>
                        <p>Price: ${b.price}</p>
                        <p>Owner: {b.ownerEmail}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
