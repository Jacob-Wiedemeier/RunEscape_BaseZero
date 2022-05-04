const express = require('express');
const app  = express();
const morgan = require('morgan');

app.use('/static', express.static('public'));
app.use('/static/interactable', express.static('public/interactable'));
app.use(morgan('dev'));

const db_router = require('./routes/db_routes')
app.use('/db', db_router)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/interface.html');
})

app.listen(process.env.port || 3000, () => {
    console.log("Running on port 3000");
});