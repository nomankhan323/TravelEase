import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllVehicles from "../pages/AllVehicles";
import AddVehicle from "../pages/AddVehicle";
import MyVehicles from "../pages/MyVehicles";
import MyBookings from "../pages/MyBookings";
import UpdateVehicle from "../pages/UpdateVehicle";
import VehicleDetails from "../pages/VehicleDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "allVehicles", element: <AllVehicles /> },
            {
                path: "addVehicle",
                element: (
                    <PrivateRoute>
                        <AddVehicle />
                    </PrivateRoute>
                ),
            },
            {
                path: "myVehicles",
                element: (
                    <PrivateRoute>
                        <MyVehicles />
                    </PrivateRoute>
                ),
            },
            {
                path: "myBookings",
                element: (
                    <PrivateRoute>
                        <MyBookings />
                    </PrivateRoute>
                ),
            },
            {
                path: "updateVehicle/:id",
                element: (
                    <PrivateRoute>
                        <UpdateVehicle />
                    </PrivateRoute>
                ),
            },
            { path: "vehicle/:id", element: <VehicleDetails /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },

            { path: "*", element: <NotFound /> },
        ],
    },
]);
