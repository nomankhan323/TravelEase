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

    // Google login
    const googleLogin = async () => {
        const res = await signInWithPopup(auth, provider);
        setUser(res.user);
    };

    // Email/password login
    const login = async (email, password) => {
        const res = await signInWithEmailAndPassword(auth, email, password);
        setUser(res.user);
    };

    // Email/password registration
    const signUp = async (email, password, name, photoURL) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, {
            displayName: name,
            photoURL: photoURL || "",
        });
        setUser({ ...res.user, displayName: name, photoURL });
    };

    // Logout
    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    // Listen for auth changes
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
