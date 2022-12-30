const cors = require('cors');
const express = require('express');
const router = require('./routes');

const app = express();
const port = 9999;

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.use('/', [router]);

app.listen(port, () => {
    console.log(`test service 2 is listening at : ${port}`);
});
