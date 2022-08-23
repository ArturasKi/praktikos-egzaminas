import { useContext, useState } from "react";
import FrontContext from "./FrontContext";
import { BsHeart } from "react-icons/bs";

function Fixers({ fixer }) {
  const { setRateNow } = useContext(FrontContext);

  const [rate, setRate] = useState("0");

  const rateIt = (e) => {
    setRate(e.target.value);
    setRateNow({
      rate: parseInt(e.target.value),
      id: fixer.id,
    });
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
        </div>
        <div className="rate mt-2">
          <label className="mr-2">Įvertink!</label>
          <button value={rate} onClick={rateIt}>
            <BsHeart />
          </button>
          <p>
            {fixer.rates
              ? "Paspaudimų skaičius: " + fixer.rates
              : "No rates yet"}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Fixers;
