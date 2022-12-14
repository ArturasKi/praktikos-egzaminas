import axios from "axios";
import { authConfig } from "../../Functions/auth";
import { useEffect, useState } from "react";
import FrontContext from "./FrontContext";
import List from "./List";
import Nav from "./Nav";
import SortFilter from "./SortFilter";

function Front() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [fixers, setFixers] = useState(null);
  const [rateNow, setRateNow] = useState(null);

  // READ FIXERS
  useEffect(() => {
    axios
      .get("http://localhost:3003/fixers", authConfig())
      .then((res) => setFixers(res.data));
  }, [lastUpdate]);

  // CREATE RATE
  useEffect(() => {
    if (null === rateNow) return;
    axios
      .put("http://localhost:3003/rates/" + rateNow.id, rateNow, authConfig())
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [rateNow]);

  return (
    <FrontContext.Provider
      value={{
        fixers,
        setRateNow
      }}
    >
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SortFilter />
          </div>
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </FrontContext.Provider>
  );
}

export default Front;
