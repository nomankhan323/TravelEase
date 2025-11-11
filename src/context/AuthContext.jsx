import { createContext, useContext, useEffect, useState } from "react";
import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleLogin = () => signInWithPopup(auth, provider);

    const signUp = async (email, password, name, photoURL) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(res.user, {
            displayName: name,
            photoURL: photoURL || "",
        });
        setUser({ ...res.user, displayName: name, photoURL });
    };

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const value = { user, loading, googleLogin, logout, signUp };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
