import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Support CRM</p>
        <h1>Ticket Desk</h1>
      </div>
      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/tickets">Tickets</NavLink>
        <NavLink to="/tickets/new">Create Ticket</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
