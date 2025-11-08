import { useParams } from "react-router-dom";

const UpdateVehicle = () => {
    const { id } = useParams();

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-3">Update Vehicle</h1>
            <p>Updating vehicle with ID: {id}</p>
        </div>
    );
};

export default UpdateVehicle;
