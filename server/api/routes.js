const express = require('express');
const router = express.Router();
const csv = require('csv-parser');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.get("/",(req,res) => {
    res.send("Hello World");
});

router.post('/upload',upload.single('csvfile'),(req,res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const results = [];
    const fileBuffer = req.file.buffer.toString();
    // Process the CSV data from memory
    const csvStream = require('stream').Readable.from(fileBuffer);
    csvStream
        .pipe(csv())
        .on('data',(data) => results.push(data))
        .on('end',() => {
            res.json(results); // Return parsed CSV data
        })
        .on('error',(error) => {
            res.status(500).send('Error processing file');
        });
});

router.post("/users",(req,res) => {
    res.send(req.params);
})

router.get("/getUsers",(req,res) => {
    res.send("Hello User");
});

module.exports = router;