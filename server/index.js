const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/upload', upload.single('csvfile'), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

app.get("/", (req,res)=>{
  console.log("Hello");
})

app.listen(PORT, () => {
  console.log('Server running on http://localhost:3001');
});

module.exports = app;
