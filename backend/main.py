import os
import json
import hashlib
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Allow frontend to make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_iocs(data):
    return {
        "domains": data.get("iocs", {}).get("domains", []),
        "ips": data.get("iocs", {}).get("ips", []),
        "file_paths": data.get("iocs", {}).get("file_paths", [])
    }

def classify_log(data):
    score = 0
    reasons = []

    if any(p.get("name", "").lower().find("powershell") != -1 for p in data.get("processes", [])):
        score += 2
        reasons.append("Detected PowerShell usage")

    if any("ransom" in op.get("file", "").lower() for op in data.get("file_operations", [])):
        score += 2
        reasons.append("Ransom-related file operation")

    if any("run" in reg.get("key", "").lower() for reg in data.get("registry", [])):
        score += 1
        reasons.append("Registry persistence detected")

    if any("cmd" in p.get("name", "").lower() for p in data.get("processes", [])):
        score += 1
        reasons.append("Command line execution")

    if score >= 3:
        return "Malicious", reasons
    elif score == 2:
        return "Suspicious", reasons
    else:
        return "Safe", reasons

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(".json"):
        raise HTTPException(status_code=400, detail="Only .json files are allowed")

    save_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(save_path, "wb") as f:
        f.write(await file.read())

    try:
        with open(save_path, "r") as f:
            data = json.load(f)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format")

    verdict, reasons = classify_log(data)
    iocs = extract_iocs(data)
    file_hash = hashlib.sha256(json.dumps(data).encode()).hexdigest()

    return JSONResponse(content={
        "verdict": verdict,
        "reasons": reasons,
        "iocs": iocs,
        "file_hash": file_hash
    })

