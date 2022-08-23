import { useContext } from "react";
import FrontContext from "./FrontContext";

function Fixers({fixers}) {

    const { setDeleteFixers } = useContext(FrontContext);

    const handleDelete = () => {
        setDeleteFixers(fixers);
    }
    
    // // const handleEdit = () => {
    // //     setModalClothes(clothes);
    // }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <p>Vardas: <b>{fixers.name}</b></p>
                    <p>Pavardė: <b>{fixers.surname}</b></p>
                    <p>Specializacija: <b>{fixers.specialization}</b></p>
                    <p>Serviso pavadinimas: <b>{fixers.serv}</b></p>
                    <p>Miestas: <b>{fixers.city}</b></p>
                    {
                        fixers.photo ? <div className="photo-bin"><img src={fixers.photo} alt='nice'/></div> : null
                    }
                </div>
                <div className="buttons">
                    {/* <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Edit</button> */}
                    {/* <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button> */}
                </div>
            </div>
        </li>
    );
}

export default Fixers;