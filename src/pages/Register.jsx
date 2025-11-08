import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        photoURL: "",
        password: "",
    });
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, email, photoURL, password } = form;

        // Password validation
        if (!/(?=.*[A-Z])(?=.*[a-z]).{6,}/.test(password)) {
            toast.error("Password must include upper, lower & 6+ chars");
            return;
        }

        try {
            await signUp(email, password, name, photoURL);
            toast.success("Registration successful!");
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                Register
            </h2>
            <form onSubmit={handleRegister} className="space-y-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="photoURL"
                    placeholder="Photo URL"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Register
                </button>
            </form>
            <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-semibold">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Register;
