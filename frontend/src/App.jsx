import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import TicketList from './pages/TicketList.jsx';
import CreateTicket from './pages/CreateTicket.jsx';
import TicketDetails from './pages/TicketDetails.jsx';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/tickets/new" element={<CreateTicket />} />
          <Route path="/tickets/:ticketId" element={<TicketDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
