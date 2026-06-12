const express = require('express');
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} = require('../controllers/ticketController.js');

const router = express.Router();

router.post('/tickets', createTicket);
router.get('/tickets', getAllTickets);
router.get('/tickets/:ticketId', getTicketById);
router.put('/tickets/:ticketId', updateTicket);

module.exports = router;
