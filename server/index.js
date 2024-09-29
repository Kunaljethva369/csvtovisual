const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: "*",
}));

app.get("/", (req,res)=>{
  res.send("Hello");
});

app.post('/upload', upload.single('csvfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const results = [];
  // fs.createReadStream(req.file.path)
  //   .pipe(csv())
  //   .on('data', (data) => results.push(data))
  //   .on('end', () => {
  //     res.json(results);
  //   });
  const fileBuffer = req.file.buffer.toString(); // Convert Buffer to string

  // Process the CSV data from memory
  const csvStream = require('stream').Readable.from(fileBuffer);
  csvStream
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results); // Return parsed CSV data
    })
    .on('error', (error) => {
      res.status(500).send('Error processing file');
    });
});


app.listen(PORT, () => {
  console.log('Server running on http://localhost:3001');
});

module.exports = app;
