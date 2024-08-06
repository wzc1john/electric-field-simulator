const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/calculateField', (req, res) => {
    const p = parseFloat(req.query.p);
    const l = parseFloat(req.query.l);
    const q = parseFloat(req.query.q);

    const epsilon0 = 8.854e-12;
    const r = Math.sqrt(Math.pow(l, 2) + Math.pow(l, 2));
    const theta = Math.atan(l / l);

    const E = (1 / (4 * Math.PI * epsilon0)) * ((3 * Math.cos(theta) * p / Math.pow(r, 3)) + (p / Math.pow(r, 3)));

    res.json({ E: E.toFixed(2) });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
