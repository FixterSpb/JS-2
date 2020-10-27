const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const cartRouter = require("./CartRouter");


/**
 * Модуль обрабатывает запросы на сервер
 */
app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use('/api/cart', cartRouter);
app.use('/single.html', express.static(path.resolve(__dirname, '../public/single.html')));

app.get('/api/products_main', (req, res) => {
    fs.readFile(path.resolve(__dirname, './db/products_main.json'), 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({result: 0, text: err}))
        }else{
            res.send(data);
        }
    });
});


/*
app.get('/api/cart', (req, res) =>{
    fs.readFile(path.resolve(__dirname, './db/cart.json'), 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({result: 0, text: err}))
        }else{
            res.send(data);
        }
    });
})
*/

const port = process.env.PORT || 5555;

app.listen(port, () => {
    console.log(`Listening ${port} port`);
});


// const http = require("http");


// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('Hello world');
//         res.end();
//     }
//
//     if (req.url === '/home') {
//         res.write('Hello world. It is home page.');
//         res.end();
//     }
//
//     if (req.url === '/api/products_main') {
//         fs.readFile('db/products_main.json', 'utf-8', (err, data) => {
//             if (err) {
//                 console.log(err);
//             }else{
//                 res.write(data);
//                 res.end();
//             }
//         })
//     };
//
//     if (req.url === '/api/products') {
//         fs.readFile('db/products.json', 'utf-8', (err, data) => {
//             if (err) {
//                 console.log(err);
//             }else{
//                 res.write(data);
//                 res.end();
//             }
//         })
//     }
// });