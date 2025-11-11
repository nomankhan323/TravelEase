import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyVehicles = () => {
    const { user } = useAuth();
    const [vehicles, setVehicles] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:5000/my-vehicles/${user.email}`)
            .then(res => res.json())
            .then(data => setVehicles(data));
    };

    useEffect(() => {
        fetchData();
    }, [user.email]);

    const handleDelete = async id => {
        const res = await fetch(`http://localhost:5000/delete-vehicle/${id}`, {
            method: "DELETE"
        });
        const data = await res.json();

        if (data.success) {
            toast.success("Vehicle deleted");
            fetchData();
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-5">My Vehicles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicles.map(v => (
                    <div key={v._id} className="border p-4 rounded shadow">
                        <img
                            src={v.coverImage}
                            alt={v.vehicleName}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h2 className="text-xl font-bold mt-2">{v.vehicleName}</h2>

                        <div className="mt-3 flex gap-3">
                            <Link
                                to={`/updateVehicle/${v._id}`}
                                className="bg-blue-600 text-white px-3 py-1 rounded"
                            >
                                Update
                            </Link>
                            <button
                                onClick={() => handleDelete(v._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyVehicles;
