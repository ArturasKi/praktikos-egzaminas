import { useContext } from "react";
import Fixer from "./Fixer";
import BackContext from "../BackContext";

function List() {

    const { fixers } = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
              <h2>Meistrų sąrašas</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    fixers ? fixers.map(fixer => <Fixer key={fixer.id} fixers={fixer}></Fixer>) : null
                    }
                </ul>
            </div>
          </div>
    )
}

export default List;