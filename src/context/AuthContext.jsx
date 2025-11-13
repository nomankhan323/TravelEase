import { createContext, useContext, useEffect, useState } from "react";
import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ------------------------
    // Google Login
    // ------------------------
    const googleLogin = async () => {
        try {
            const res = await signInWithPopup(auth, provider);
            setUser(res.user);
        } catch (err) {
            console.error("Google Login Error:", err.message);
        }
    };

    // ------------------------
    // Email/Password Login
    // ------------------------
    const login = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            setUser(res.user);
        } catch (err) {
            console.error("Login Error:", err.message);
            throw err;
        }
    };

    // ------------------------
    // Email/Password Registration
    // ------------------------
    const signUp = async (email, password, name, photoURL) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // Update Firebase user profile
            await updateProfile(res.user, {
                displayName: name,
                photoURL: photoURL || "",
            });

            // Set updated user in context
            const updatedUser = {
                ...res.user,
                displayName: name,
                photoURL: photoURL || "",
            };
            setUser(updatedUser);
        } catch (err) {
            console.error("SignUp Error:", err.message);
            throw err;
        }
    };

    // ------------------------
    // Logout
    // ------------------------
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (err) {
            console.error("Logout Error:", err.message);
        }
    };

    // ------------------------
    // Listen for auth changes
    // ------------------------
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const value = { user, loading, googleLogin, login, logout, signUp };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
