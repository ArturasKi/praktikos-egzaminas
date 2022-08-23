import { useContext } from "react";
import Service from "./Service";
import BackContext from "../BackContext";

function List() {

    const { services } = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
              <h2>Servisų sąrašas</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    services ? services.map(service => <Service key={service.id} services={service}></Service>) : null
                    }
                </ul>
            </div>
          </div>
    )
}

export default List;