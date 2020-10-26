const express = require('express');
const fs = require('fs');
const handler = require('./Handler');
const router = express.Router();
const path = require('path');

const cartJSONPath = path.resolve(__dirname, './db/cart.json');

router.get('/', (req, res) => {
    console.log("getCart. ", cartJSONPath);
    fs.readFile(cartJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

router.post('/', (req, res) => {
    console.log("postCart");
    handler(req, res, 'add', cartJSONPath);
});

router.put('/:id', (req, res) => {
    console.log("putCart");
    handler(req, res, 'change', cartJSONPath);
});

router.delete('/:id', (req, res) => {
    console.log("deleteCart");
    handler(req, res, 'remove', cartJSONPath);
});

module.exports = router;