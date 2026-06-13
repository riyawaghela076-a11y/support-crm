const express = require('express');
const cors = require('cors');
require('./database/db.js');

const ticketRoutes = require('./routes/ticketRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', ticketRoutes);

app.get('/', (req, res) => {
  res.send('Support CRM API Running');
});

app.listen(PORT, () => {
  console.log('Server running on port 5000');
});
