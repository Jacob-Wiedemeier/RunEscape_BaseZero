const express = require('express');
const app  = express();
const path = require('path');
const router = express.Router();

app.use('/static', express.static('public'));

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/interface.html'));
});

app.use('/', router);
app.listen(process.env.port || 3000);

console.log("Running on port 3000");
