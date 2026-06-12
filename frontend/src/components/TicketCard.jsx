import { Link } from 'react-router-dom';

function TicketCard({ ticket }) {
  return (
    <article className="ticket-card">
      <div className="ticket-card-header">
        <div>
          <p className="ticket-id">{ticket.ticket_id}</p>
          <h2>{ticket.subject}</h2>
        </div>
        <span className={`status status-${ticket.status.toLowerCase().replaceAll(' ', '-')}`}>
          {ticket.status}
        </span>
      </div>

      <div className="ticket-meta">
        <span>{ticket.customer_name}</span>
        <span aria-hidden="true">•</span>
        <span>{ticket.customer_email}</span>
      </div>

      <p className="ticket-description">
        {ticket.description || 'No description provided.'}
      </p>

      <div className="ticket-card-footer">
        <span>Created {new Date(ticket.created_at).toLocaleString()}</span>
        <Link className="details-link" to={`/tickets/${ticket.ticket_id}`}>
          View details
        </Link>
      </div>
    </article>
  );
}

export default TicketCard;
