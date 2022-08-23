import axios from "axios";
import { authConfig } from "../../Functions/auth";
import { useEffect, useState } from "react";
import FrontContext from "./FrontContext";
import List from "./List";

function Front() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [fixers, setFixers] = useState(null);

  // READ FIXERS
  useEffect(() => {
    axios
      .get("http://localhost:3003/fixers", authConfig())
      .then((res) => setFixers(res.data));
  }, []);

  return (
    <FrontContext.Provider
      value={{
        fixers,
      }}
    >
      {/* <Nav /> */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </FrontContext.Provider>
  );
}

export default Front;
