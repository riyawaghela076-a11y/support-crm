import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/tickets';

const initialForm = {
  customer_name: '',
  customer_email: '',
  subject: '',
  description: '',
  status: 'Open',
  notes: '',
};

function CreateTicket() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to create ticket');
      }

      navigate(`/tickets/${data.ticket.ticket_id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page narrow-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">New Request</p>
          <h2>Create Ticket</h2>
        </div>
      </div>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Customer name</span>
          <input
            value={form.customer_name}
            onChange={(event) => updateField('customer_name', event.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Customer email</span>
          <input
            type="email"
            value={form.customer_email}
            onChange={(event) => updateField('customer_email', event.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Subject</span>
          <input
            value={form.subject}
            onChange={(event) => updateField('subject', event.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Status</span>
          <select
            value={form.status}
            onChange={(event) => updateField('status', event.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </label>

        <label className="field full-span">
          <span>Description</span>
          <textarea
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
            rows="5"
          />
        </label>

        <label className="field full-span">
          <span>Notes</span>
          <textarea
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            rows="4"
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions full-span">
          <button type="submit" disabled={saving}>
            {saving ? 'Creating...' : 'Create Ticket'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateTicket;
