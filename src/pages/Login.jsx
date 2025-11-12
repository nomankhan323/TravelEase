import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            toast.success("✅ Login successful!");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error("❌ " + err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            toast.success("✅ Logged in with Google!");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error("❌ " + err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-20">
            <h1 className="text-3xl font-semibold mb-6 text-blue-600">Login</h1>
            <form
                onSubmit={handleEmailLogin}
                className="border rounded p-6 w-80 flex flex-col gap-3 shadow-md bg-sky-50"
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                >
                    Login
                </button>
                <p className="text-sm text-center mt-2">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-semibold">
                        Register
                    </Link>
                </p>
            </form>
            <div className="mt-4">
                <button
                    onClick={handleGoogleLogin}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
