import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const { googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = async () => {
        await googleLogin();
        navigate(from, { replace: true });
    };

    return (
        <div className="flex flex-col items-center justify-center py-20">
            <h1 className="text-3xl font-semibold mb-6">Login to Continue</h1>
            <button onClick={handleGoogleLogin} className="bg-blue-500 px-4 py-2 text-white rounded">
                Continue with Google
            </button>
        </div>
    );
};

export default Login;
