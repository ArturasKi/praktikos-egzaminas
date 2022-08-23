import { useContext } from "react";
import BackContext from "../BackContext";

function Fixers({services}) {

    const { setDeleteFixers, setModalFixers } = useContext(BackContext);

    const handleDelete = () => {
        // setDeleteFixers(fixers);
    }
    
    const handleEdit = () => {
        // setModalFixers(fixers);
    }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <p>Serviso pavadinimas: <b>{services.title}</b></p>
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default Fixers;