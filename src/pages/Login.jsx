import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

const Login = () => {
    const { login, googleLogin } = useAuth();
    const { dark } = useTheme();
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

    const inputClass = `border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${dark ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600" : "bg-white text-gray-900 placeholder-gray-700 border-gray-300"
        }`;

    const formBg = dark ? "bg-gray-800 shadow-lg" : "bg-sky-50 shadow-md";

    return (
        <div className={`flex flex-col items-center justify-center py-20 min-h-screen ${dark ? "bg-gray-900" : "bg-white"}`}>
            <h1 className={`text-3xl font-semibold mb-6 ${dark ? "text-white" : "text-blue-600"}`}>Login</h1>

            <form
                onSubmit={handleEmailLogin}
                className={`border rounded p-6 w-80 flex flex-col gap-3 ${formBg}`}
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors"
                >
                    Login
                </button>
                <p className={`text-sm text-center mt-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-semibold">
                        Register
                    </Link>
                </p>
            </form>

            <div className="mt-4">
                <button
                    onClick={handleGoogleLogin}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                >
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
