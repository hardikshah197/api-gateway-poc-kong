const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'test service 2 is running'
    });
});

router.get('/hello', (req, res) => {
    const user_id = req.get('host').split(":")[1];
    res.json({
        message: `hi you are ${user_id} right ?`
    });
});

module.exports = router;
