import { useContext, useState } from "react";
import FrontContext from "./FrontContext";

function Fixers({ fixer }) {
  const { setRateNow } = useContext(FrontContext);

  const [rate, setRate] = useState("5");

  console.log(fixer.rate)

  const rateIt = (e) => {
    setRate(e.target.value);
    setRateNow({
      rate: parseInt(e.target.value),
      id: fixer.id,
    });
        console.log(fixer.rate_sum)
  };

  return (
    <li className="list-group-item">
      <div className="item">
        <div className="content">
          <p>
            Vardas: <b>{fixer.name}</b>
          </p>
          <p>
            Pavardė: <b>{fixer.surname}</b>
          </p>
          <p>
            Specializacija: <b>{fixer.specialization}</b>
          </p>
          <p>
            Serviso pavadinimas: <b>{fixer.serv}</b>
          </p>
          <p>
            Miestas: <b>{fixer.city}</b>
          </p>
          {fixer.photo ? (
            <div className="photo-bin">
              <img src={fixer.photo} alt="nice" />
            </div>
          ) : null}
          <b className="ml-2">
                {
                    fixer.rate_sum ? 'Rate: ' + (fixer.rate_sum / fixer.rates).toFixed(2) + ' / 10' : 'No rates yet'
                }
            </b>
        </div>
        <div className="form-group mt-3">
          <label className="mr-2">Rate it!</label>
          <select value={rate} onChange={rateIt}>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
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
