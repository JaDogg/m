#!/usr/bin/env node
// One-time script: splits devices.js into individual JSON files
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'devices.js'), 'utf8');
// devices.js = "const DEVICES = [\n...items..." (no closing ]; — it's in theory.js)
const body = src.replace(/^const DEVICES = \[/, '').trimEnd();
const DEVICES = eval('[' + body + ']');

const outDir = path.join(__dirname, 'devices');
fs.mkdirSync(outDir, { recursive: true });

for (const device of DEVICES) {
  const file = path.join(outDir, device.id + '.json');
  fs.writeFileSync(file, JSON.stringify(device, null, 2));
  console.log('wrote', device.id + '.json');
}
