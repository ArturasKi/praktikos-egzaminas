import { useContext, useState, useRef } from "react";
import BackContext from "../BackContext";
import getBase64 from '../../../Functions/getBase64';

function Create() {
  const { setCreateFixers, services } = useContext(BackContext);

  const fileInput = useRef();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [city, setCity] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);

  const handleCreate = () => {
    const data = { 
        name,
        surname,
        specialization,
        serv: serviceName,
        city,
        photo: photoPrint
     };
     setCreateFixers(data);
     setName('');
     setSurname('');
     setSpecialization('');
     setServiceName('');
     setCity('');
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
    .then(photo => setPhotoPrint(photo))
    .catch(_ => {
      // tylim
    });
  }

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Sukurti naują meistro aprašą</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Vardas</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <small className="form-text text-muted">Įveskite vardą.</small>
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
          <label>Servisas</label>
          <select
            className="form-control"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          >
            <option value="0">Pasirinkti servisą</option>
            {services
              ? services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))
              : null}
          </select>
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
          <small className="form-text text-muted">Įkelti nuotrauką</small>
        </div>
          {
            photoPrint ? <div className="photo-bin"><img src={photoPrint} alt='nice'/></div> : null
          }
        <button
          type="button"
          className="btn btn-outline-primary with-loader"
          onClick={handleCreate}>Sukurti</button>
      </div>
    </div>
  );
}

export default Create;