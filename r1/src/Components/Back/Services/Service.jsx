import { useContext } from "react";
import BackContext from "../BackContext";

function Fixers({services}) {

    const { setDeleteServices, setModalServices } = useContext(BackContext);

    const handleDelete = () => {
        setDeleteServices(services);
    }
    
    const handleEdit = () => {
        setModalServices(services);
    }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <p>Serviso pavadinimas: <b>{services.title}</b></p>
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Redaguoti</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Ištrinti</button>
                </div>
            </div>
        </li>
    );
}

export default Fixers;