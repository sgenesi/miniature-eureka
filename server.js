const fs = require('fs');
const path = require('path');
const express = require('express');

// Initialize express app
const PORT = process.env.PORT || 3001;
const app = express();

// Parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require('./routes/routes')(app);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});