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
  // const [search, setSearch] = useState('');

  const [rateNow, setRateNow] = useState(null);

  // READ PRUDUCT
  // useEffect(() => {

  //   let query;
  //   if (!search) {
  //     query = ''; // jei filtras yra 0, tai query yra tuščias string'as, nieko jame nėra;
  //   } else {
  //     query = '?s=' + search
  //   }
  //   axios
  //     .get("http://localhost:3003/fixers/" + query, authConfig())
  //     .then((res) => setFixers((res.data)));
  //   }, [search, lastUpdate]);

  // READ FIXERS
  useEffect(() => {
    axios
      .get("http://localhost:3003/fixers", authConfig())
      .then((res) => setFixers(res.data));
  }, []);

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
        setRateNow,
        // setSearch
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
