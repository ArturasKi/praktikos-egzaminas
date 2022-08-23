import { useEffect, useState, useContext } from "react";
import BackContext from "../BackContext.jsx";

function Edit() {

  const { modalServices, setEditServices, setModalServices } = useContext(BackContext);

  const [title, setTitle] = useState("");

useEffect(() => {
    if (null === modalServices) {
        return;
    }
    setTitle(modalServices.title);
}, [modalServices]);

const handleEdit = () => {
    const data = {
        title
    };
    console.log(data);
    setEditServices(data);
    setModalServices(null);
}

  if (modalServices === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Redaguoti serviso informaciją</h5>
            <button
              type="button"
              className="close"
              onClick={() => setModalServices(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
        <div className="form-group">
          <label>Pavadinimas</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <small className="form-text text-muted">Įvesti pavadinimą.</small>
        </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalServices(null)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;