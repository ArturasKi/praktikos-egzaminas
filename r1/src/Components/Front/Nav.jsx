import { NavLink, Link } from "react-router-dom";

function Nav() {

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="nav">
                        <NavLink to="/" className="nav-link" style={({ isActive }) => // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
                        isActive ? {
                            color: 'crimson'
                        } : undefined
                        }>Meistrų sąrašas</NavLink>
                        <Link className="nav-link" to="/logout">Atsijungti</Link>
                    </nav>
                </div>
            </div>
        </div>
        </>
    )
}

export default Nav;