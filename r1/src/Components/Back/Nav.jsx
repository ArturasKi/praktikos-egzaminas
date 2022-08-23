import { NavLink, Link } from "react-router-dom";

function Nav() {

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="nav">
                        <NavLink to="/admin/" className="nav-link" style={({ isActive }) => // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
                        isActive ? {
                            color: 'crimson'
                        } : undefined
                        }>Pridėti servisą</NavLink>
                        <NavLink to="/admin/services" className="nav-link" style={({ isActive }) => // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
                        isActive ? {
                            color: 'crimson'
                        } : undefined
                        }>Servisų sąrašas</NavLink>
                        <NavLink to="/admin/create" className="nav-link" style={({ isActive }) => // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
                        isActive ? {
                            color: 'crimson'
                        } : undefined
                        }>Pridėti meistrą</NavLink>
                        <NavLink to="/admin/fixers" className="nav-link" style={({ isActive }) => // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
                        isActive ? {
                            color: 'crimson'
                        } : undefined
                        }>Meistrų sąrašas</NavLink>
                        <NavLink to="/" className="nav-link" style={({ isActive }) => // funkcija gauna argumentą isActive, jei true vienas stilus, false - kitas;
                        isActive ? {
                            color: 'crimson'
                        } : undefined
                        }>Vieša sritis</NavLink>
                        <Link className="nav-link" to="/logout">Logout</Link>
                    </nav>
                </div>
            </div>
        </div>
        </>
    )
}

export default Nav;