#!/usr/bin/env python3
"""Assembles index.html from template + extracted CSS/JS parts."""

import json
from pathlib import Path

base = Path(__file__).parent
root = base.parent

template = (base / "template.html").read_text()
style = (base / "style.css").read_text()
theory = (base / "theory.js").read_text()
script = (base / "script.js").read_text()

# Build DEVICES array from individual JSON files
devices_dir = base / "devices"
order = json.loads((devices_dir / "index.json").read_text())
device_objects = [
    json.dumps(json.loads((devices_dir / f"{dev_id}.json").read_text()), ensure_ascii=False)
    for dev_id in order
]
devices = "const DEVICES = [\n" + ",\n".join(device_objects) + "\n];"

output = (
    template
    .replace("{{STYLE}}", style)
    .replace("{{DEVICES}}", devices)
    .replace("{{THEORY}}", theory)
    .replace("{{SCRIPT}}", script)
)

(root / "index.html").write_text(output)
print("Generated index.html")
