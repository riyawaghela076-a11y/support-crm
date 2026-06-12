import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/tickets';

function TicketDetails() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState('Open');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${API_URL}/${ticketId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load ticket');
        }

        setTicket(data);
        setStatus(data.status);
        setNotes(data.notes || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, notes }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update ticket');
      }

      setTicket(data.ticket);
      setMessage('Ticket updated successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="state-message">Loading ticket...</p>;
  }

  if (error && !ticket) {
    return (
      <section className="page narrow-page">
        <p className="state-message error">{error}</p>
        <Link className="text-link" to="/tickets">Back to tickets</Link>
      </section>
    );
  }

  return (
    <section className="page narrow-page">
      <div className="details-header">
        <Link className="text-link" to="/tickets">Back to tickets</Link>
        <span className={`status status-${ticket.status.toLowerCase().replaceAll(' ', '-')}`}>
          {ticket.status}
        </span>
      </div>

      <article className="details-panel">
        <p className="ticket-id">{ticket.ticket_id}</p>
        <h2>{ticket.subject}</h2>

        <dl className="details-list">
          <div>
            <dt>Customer</dt>
            <dd>{ticket.customer_name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{ticket.customer_email}</dd>
          </div>
          <div>
            <dt>Created</dt>
            <dd>{new Date(ticket.created_at).toLocaleString()}</dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd>{new Date(ticket.updated_at).toLocaleString()}</dd>
          </div>
        </dl>

        <div className="copy-block">
          <h3>Description</h3>
          <p>{ticket.description || 'No description provided.'}</p>
        </div>
      </article>

      <form className="ticket-form single-column" onSubmit={handleUpdate}>
        <label className="field">
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </label>

        <label className="field">
          <span>Notes</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows="6"
          />
        </label>

        {error && <p className="form-error">{error}</p>}
        {message && <p className="form-success">{message}</p>}

        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Updating...' : 'Update Ticket'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default TicketDetails;
