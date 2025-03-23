const express = require('express');
const fs = require('fs');
const axios = require('axios');
// Create an instance of Express
const app = express();
app.use(express.json());
// Set up a server to listen on port 3000
const PORT = 3000;

let jsonData = null;

app.post("/", (request, response) => {
  jsonData = request.body; // Store received data
  console.log('Received POST data:', jsonData);
  const audio = request.body.data.data[0].audio_url;
  console.log(jsonData);
  console.log(audio);
  // Send data to the other server via a GET request

});

app.get('/get_data', (req, res) => {
  if (jsonData) {
    res.status(200).json(jsonData); // Send the stored data
  } else {
    res.status(404).json({ message: 'No data available' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});