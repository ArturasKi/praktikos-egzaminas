import { useContext, useState } from "react";
import BackContext from "../BackContext";

function Create() {
  const { setCreateServices } = useContext(BackContext);

  const [title, setTitle] = useState("");


  const handleCreate = () => {
    const data = { 
        title
     };
     setCreateServices(data);
     setTitle('');
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Sukurti naują servisą</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Serviso pavadinimas</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <small className="form-text text-muted">Įveskite pavadinimą.</small>
        </div>
        <button
          type="button"
          className="btn btn-outline-primary with-loader"
          onClick={handleCreate}>Sukurti</button>
      </div>
    </div>
  );
}

export default Create;