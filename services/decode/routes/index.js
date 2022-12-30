const express = require('express');
const jwt_decode = require('jwt-decode');
const fetch = require('node-fetch');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message : "decoding service is running" });
});

router.get('/decode', (req, res) => {
    try {
        const encodedToken = req.header('authorization').split(' ')[1];
        if (!encodedToken) {
            res.status(401).json({ error : "token not found"})
        }
        try {
            const data = jwt_decode(encodedToken);
            if (data && data.user_id) {
                const url = `http://localhost:${data.user_id}/hello`
                fetch(url, {
                    method:'GET',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                })
                .then(response => response.json())
                .then(resp => {
                    res.status(200).json({
                        message: resp.message
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error : err
                    });
                })   
            }
            else {
                res.status(404).json({
                    message: 'token does not contain user id',
                });
            }
        }
        catch (err) {
            res.status(500).json({ message: "invalid token" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "invalid token" });
    }
});

module.exports = router;