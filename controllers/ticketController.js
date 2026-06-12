const db = require('../database/db.js');

const generateTicketId = (callback) => {
  db.get('SELECT ticket_id FROM tickets ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) {
      callback(err);
      return;
    }

    const lastNumber = row ? parseInt(row.ticket_id.replace('TKT-', ''), 10) : 0;
    const nextNumber = lastNumber + 1;
    const ticketId = `TKT-${String(nextNumber).padStart(3, '0')}`;

    callback(null, ticketId);
  });
};

const createTicket = (req, res) => {
  const {
    customer_name,
    customer_email,
    subject,
    description,
    status = 'Open',
    notes = '',
  } = req.body;

  if (!customer_name || !customer_email || !subject) {
    return res.status(400).json({
      message: 'customer_name, customer_email, and subject are required',
    });
  }

  generateTicketId((ticketErr, ticketId) => {
    if (ticketErr) {
      return res.status(500).json({ message: ticketErr.message });
    }

    const sql = `
      INSERT INTO tickets (
        ticket_id,
        customer_name,
        customer_email,
        subject,
        description,
        status,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      ticketId,
      customer_name,
      customer_email,
      subject,
      description || '',
      status,
      notes,
    ];

    db.run(sql, params, function insertTicket(err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      return res.status(201).json({
        message: 'Ticket created successfully',
        ticket: {
          id: this.lastID,
          ticket_id: ticketId,
          customer_name,
          customer_email,
          subject,
          description: description || '',
          status,
          notes,
        },
      });
    });
  });
};

const getAllTickets = (req, res) => {
  const { search, status } = req.query;
  const where = [];
  const params = [];

  if (search) {
    const searchTerm = `%${search}%`;
    where.push(`(
      customer_name LIKE ?
      OR customer_email LIKE ?
      OR ticket_id LIKE ?
      OR description LIKE ?
    )`);
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  if (status) {
    where.push('status = ?');
    params.push(status);
  }

  const sql = `
    SELECT *
    FROM tickets
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY created_at DESC
  `;

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    return res.status(200).json(rows);
  });
};

const getTicketById = (req, res) => {
  const id = req.params.ticketId || req.params.id;

  db.get('SELECT * FROM tickets WHERE id = ? OR ticket_id = ?', [id, id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    return res.status(200).json(row);
  });
};

const updateTicket = (req, res) => {
  const id = req.params.ticketId || req.params.id;
  const { status, notes } = req.body;

  if (status === undefined && notes === undefined) {
    return res.status(400).json({
      message: 'status or notes is required',
    });
  }

  const fields = [];
  const params = [];

  if (status !== undefined) {
    fields.push('status = ?');
    params.push(status);
  }

  if (notes !== undefined) {
    fields.push('notes = ?');
    params.push(notes);
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  params.push(id, id);

  const sql = `
    UPDATE tickets
    SET ${fields.join(', ')}
    WHERE id = ? OR ticket_id = ?
  `;

  db.run(sql, params, function updateTicketById(err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    return db.get('SELECT * FROM tickets WHERE id = ? OR ticket_id = ?', [id, id], (selectErr, row) => {
      if (selectErr) {
        return res.status(500).json({ message: selectErr.message });
      }

      return res.status(200).json({
        message: 'Ticket updated successfully',
        ticket: row,
      });
    });
  });
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
};
