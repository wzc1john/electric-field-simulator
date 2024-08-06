const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const dipoleMomentInput = document.getElementById('dipoleMoment');
const distanceInput = document.getElementById('distance');
const chargeInput = document.getElementById('charge');
const calculateButton = document.getElementById('calculateButton');
const result = document.getElementById('result');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const length = 100; // length l
const chargeSeparation = 50; // separation a and b

function drawAxes() {
    // Draw X and Z axes
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawDipoleAndQuadrupole() {
    // Draw charges and lines
    ctx.beginPath();
    ctx.arc(centerX, centerY - chargeSeparation, 5, 0, 2 * Math.PI); // +b
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY + chargeSeparation, 5, 0, 2 * Math.PI); // -b
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY - length, 5, 0, 2 * Math.PI); // +a
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY + length, 5, 0, 2 * Math.PI); // -a
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.stroke();

    // Draw lines
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - chargeSeparation);
    ctx.lineTo(centerX, centerY + chargeSeparation);
    ctx.moveTo(centerX, centerY - length);
    ctx.lineTo(centerX, centerY + length);
    ctx.strokeStyle = 'brown';
    ctx.stroke();
}

function drawFieldLines() {
    // Points P, r+, r-, R
    const pointP = { x: centerX + 200, y: centerY - 150 };
    ctx.beginPath();
    ctx.arc(pointP.x, pointP.y, 5, 0, 2 * Math.PI); // P
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();

    // Draw r+, r-, and R lines
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - chargeSeparation);
    ctx.lineTo(pointP.x, pointP.y); // r+
    ctx.moveTo(centerX, centerY + chargeSeparation);
    ctx.lineTo(pointP.x, pointP.y); // r-
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(pointP.x, pointP.y); // R
    ctx.strokeStyle = 'red';
    ctx.stroke();

    // Label angles and lines
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('r+', (centerX + pointP.x) / 2, (centerY - chargeSeparation + pointP.y) / 2);
    ctx.fillText('r-', (centerX + pointP.x) / 2, (centerY + chargeSeparation + pointP.y) / 2);
    ctx.fillText('R', (centerX + pointP.x) / 2, (centerY + pointP.y) / 2);
    ctx.fillText('θ', centerX + 10, centerY - length / 2);
}

function calculateField() {
    const p = parseFloat(dipoleMomentInput.value);
    const l = parseFloat(distanceInput.value);
    const q = parseFloat(chargeInput.value);

    const epsilon0 = 8.854e-12;
    const r = Math.sqrt(Math.pow(l, 2) + Math.pow(l, 2));
    const theta = Math.atan(l / l);

    const E = (1 / (4 * Math.PI * epsilon0)) * ((3 * Math.cos(theta) * p / Math.pow(r, 3)) + (p / Math.pow(r, 3)));

    result.textContent = `Electric Field Strength: ${E.toFixed(2)} N/C`;
    drawDipoleAndQuadrupole();
    drawFieldLines();
}

calculateButton.addEventListener('click', calculateField);
drawAxes();
drawDipoleAndQuadrupole();
