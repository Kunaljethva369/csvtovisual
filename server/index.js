const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const all_router = require('./api/routes');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://csvtovisual.netlify.app'], 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
}));

app.options('*', cors()); 

app.use("/api", all_router);

app.listen(PORT, () => {
  console.log('Server running on http://localhost:3001');
});

module.exports = app;
