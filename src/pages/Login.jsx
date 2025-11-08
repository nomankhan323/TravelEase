import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            toast.success("Login successful");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-3">
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>

            <button
                onClick={googleLogin}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
                Login with Google
            </button>

            <p className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 font-semibold">
                    Register
                </Link>
            </p>
        </div>
    );
};

export default Login;
