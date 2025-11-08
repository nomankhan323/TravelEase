import { useParams } from "react-router-dom";

const VehicleDetails = () => {
    const { id } = useParams();

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-3">Vehicle Details</h1>
            <p>Showing details for vehicle ID: {id}</p>
        </div>
    );
};

export default VehicleDetails;
