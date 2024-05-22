// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const comments = [];

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  const pathname = urlObj.pathname;
  if (pathname === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('404, 页面未找到');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  } else if (pathname === '/comments') {
    const data = querystring.parse(urlObj.query);
    comments.push(data.comment);
    res.end(JSON.stringify(comments));
  } else {
    fs.readFile(`.${pathname}`, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('404, 页面未找到');
        return;
      }
      res.end(data);
    });
  }
});

server.listen(3000, () => {
  console.log('server is running at http://