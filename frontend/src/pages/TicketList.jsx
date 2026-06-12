import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import TicketCard from '../components/TicketCard.jsx';

const API_URL = 'http://localhost:5000/api/tickets';

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const statusCounts = useMemo(() => {
    return tickets.reduce(
      (counts, ticket) => ({
        ...counts,
        [ticket.status]: (counts[ticket.status] || 0) + 1,
      }),
      {}
    );
  }, [tickets]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.append('search', search.trim());
    }

    if (status) {
      params.append('status', status);
    }

    return params.toString();
  }, [search, status]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTickets = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${API_URL}${queryString ? `?${queryString}` : ''}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Unable to load tickets');
        }

        const data = await response.json();
        setTickets(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();

    return () => controller.abort();
  }, [queryString]);

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Queue</p>
          <h2>All Support Tickets</h2>
        </div>
        <p className="count-pill">{tickets.length} tickets</p>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total</span>
          <strong>{tickets.length}</strong>
        </div>
        <div className="summary-card">
          <span>Open</span>
          <strong>{statusCounts.Open || 0}</strong>
        </div>
        <div className="summary-card">
          <span>In Progress</span>
          <strong>{statusCounts['In Progress'] || 0}</strong>
        </div>
        <div className="summary-card">
          <span>Resolved</span>
          <strong>{statusCounts.Resolved || 0}</strong>
        </div>
      </div>

      <SearchBar
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {loading && <p className="state-message">Loading tickets...</p>}
      {error && <p className="state-message error">{error}</p>}

      {!loading && !error && (
        <div className="ticket-grid">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          ) : (
            <p className="state-message">No tickets match your filters.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default TicketList;
