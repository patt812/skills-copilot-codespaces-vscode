// Create web server
// 1. Create a web server
// 2. Read file 'index.html'
// 3. Read file 'comments.json'
// 4. Send the content of 'index.html' and 'comments.json' to the browser
// 5. When the browser sends a POST request to the server, add the content of the request to the 'comments.json' file
// 6. When the browser sends a GET request to the server, send the content of 'comments.json' to the browser

// 1. Create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer((req, res) => {
    console.log(req.method, req.url);
    // 2. Read file 'index.html'
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('500 - Internal Error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (req.url === '/comments.json') {
        // 3. Read file 'comments.json'
        fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('500 - Internal Error');
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/comments.json') {
        // 5. When the browser sends a POST request to the server, add the content of the request to the 'comments.json' file
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            fs.appendFile(path.join(__dirname, 'comments.json'), body, (err) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('500 - Internal Error');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end('Data added to comments.json');
                }
            });
        });
    }
});