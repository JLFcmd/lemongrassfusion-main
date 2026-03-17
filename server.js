const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load environment variables from .env if present
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '.env');

if (fs.existsSync(envPath)) {
    const result = dotenv.config({ path: envPath });
    if (result.error) {
        console.error("❌ Error loading .env file:", result.error);
    } else {
        console.log("✔ .env file loaded successfully from:", envPath);
    }
} else {
    console.warn("⚠ .env file NOT found at:", envPath);
}

if (!process.env.GROQ_API_KEY) {
    console.warn("⚠ WARNING: GROQ_API_KEY is currently missing in process.env!");
} else {
    console.log("✔ GROQ_API_KEY detected (starts with: " + process.env.GROQ_API_KEY.substring(0, 7) + "...)");
}

const PORT = 3000;

// Import the Vercel function logic
// Note: We need to mock the req/res objects for the Vercel function
const chatHandler = require('./api/chat.js');

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let filePath = '.' + parsedUrl.pathname;
    
    // Handle API route
    if (parsedUrl.pathname === '/api/chat') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                // Mock Vercel req/res
                const mockReq = {
                    method: 'POST',
                    body: body,
                    headers: req.headers
                };
                const mockRes = {
                    status: (code) => ({
                        json: (data) => {
                            res.writeHead(code, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(data));
                        },
                        end: () => {
                            res.writeHead(code);
                            res.end();
                        }
                    }),
                    setHeader: (name, value) => {
                        res.setHeader(name, value);
                    }
                };
                
                chatHandler(mockReq, mockRes).catch(err => {
                    console.error("API Error:", err);
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                });
            });
            return;
        } else if (req.method === 'OPTIONS') {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end();
            return;
        }
    }

    // Handle Static Files
    if (filePath === './') filePath = './index.html';

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', (err, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content404 || '404 Not Found', 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\x1b[32m✔ Local Server running at http://localhost:${PORT}\x1b[0m`);
    console.log(`\x1b[33mℹ To use the chatbot, make sure GROQ_API_KEY is set.\x1b[0m`);
    console.log(`\x1b[36mℹ Press Ctrl+C to stop.\x1b[0m`);
});
