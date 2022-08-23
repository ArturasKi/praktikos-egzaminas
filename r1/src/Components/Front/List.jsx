import { useContext } from "react";
import Fixer from "./Fixer";
import FrontContext from "./FrontContext";

function List() {

    const { fixers } = useContext(FrontContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
              <h2>Meistrų sąrašas</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    fixers ? fixers.map(fixer => <Fixer key={fixer.id} fixer={fixer}></Fixer>) : null
                    }
                </ul>
            </div>
          </div>
    )
}

export default List;