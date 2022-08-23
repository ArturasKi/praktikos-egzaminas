import { useEffect, useState, useContext, useRef } from "react";
import BackContext from "../BackContext.jsx";
import getBase64 from "../../../Functions/getBase64.js";

function Edit() {

  const { modalFixers, setEditFixers, setModalFixers, fixers, setDeletePhoto } = useContext(BackContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [city, setCity] = useState("");
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);

useEffect(() => {
    if (null === modalFixers) {
        return;
    }
    setName(modalFixers.name);
    setSurname(modalFixers.surname);
    setSpecialization(modalFixers.specialization);
    setServiceName(modalFixers.service_name);
    setCity(modalFixers.city);

    setPhotoPrint(modalFixers.photo);
}, [modalFixers, fixers]);

const doPhoto = () => {
  getBase64(fileInput.current.files[0])
  .then(photo => setPhotoPrint(photo))
  .catch(_ => {
  });
}

const handleEdit = () => {
    const data = {
        name: name,
        id: modalFixers.id,
        surname: surname,
        specialization: specialization,
        service_name: serviceName,
        city: city,
        photo: photoPrint
    };
    console.log(data);
    setEditFixers(data);
    setModalFixers(null);
}

const handleDeletePhoto = () => {
    setDeletePhoto({id: modalFixers.id});
    setModalFixers(p => ({...p, photo: null}));
    setPhotoPrint(null);
}

  if (modalFixers === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product changer</h5>
            <button
              type="button"
              className="close"
              onClick={() => setModalFixers(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
        <div className="form-group">
          <label>Vardas</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <small className="form-text text-muted">Enter type.</small>
        </div>
        <div className="form-group">
          <label>Pavardė</label>
          <input
            type="text"
            className="form-control"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          ></input>
          <small className="form-text text-muted">Įveskite pavardę.</small>
        </div>
        <div className="form-group">
          <label>Specializacija</label>
          <input
            type="text"
            className="form-control"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          ></input>
          <small className="form-text text-muted">Įveskite specializaciją.</small>
        </div>
        <div className="form-group">
          <label>Serviso pavadinimas</label>
          <input
            type="text"
            className="form-control"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          ></input>
          <small className="form-text text-muted">Įveskite serviso pavadinimą.</small>
        </div>
        <div className="form-group">
          <label>Miestas</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <small className="form-text text-muted">Įveskite miestą.</small>
        </div>
        <div className="form-group">
          <label>Nuotrauka</label>
          <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
          <small className="form-text text-muted">Pakeisti nuotrauką</small>
        </div>
          {
            photoPrint ? <div className="photo-bin-modal"><img src={photoPrint} alt='nice'/></div> : null
          }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
            <button type="button" className="btn btn-outline-danger" onClick={handleDeletePhoto}>Remove photo</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalFixers(null)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;