![image](https://github.com/user-attachments/assets/7c347c6e-c9b0-40f1-8262-5e66ce1a3c65)

# 🛡️ Payload Prism

> Lightweight, AI-powered malware verdict engine with a touch of blockchain integrity.

---

## 📦 What is Payload Prism?

**Payload Prism** is a Web Tool that lets users upload suspected malware log files (e.g., sandbox reports or raw logs). Using rules on malware behavior and IOCs (Indicators of Compromise), it returns a **verdict** — `Malicious` or `Benign` — along with extracted intelligence.

---

## 🚀 Features

- 🧠 **Malware Verdict Inference** using trained ML models
- 📁 Upload `.json` or `.log` files directly from web or browser extension
- 🔍 Lightweight JSON parsing and pattern matching
- ⛓️ (Optional) Blockchain logging for immutable threat records
- 💻 Built using **FastAPI**, **Next.js**, and **ShadCN UI**
- 🧩 Chrome extension for instant malware checkups

---

## ⚙️ How It Works

1. User uploads a log file (e.g., sandbox.json).
2. The backend extracts key indicators (processes, IPs, domains, behaviors).
3. A simple rule file analyzes these indicators.
4. A verdict is returned:
   ```
   Verdict: ⚠️ Malicious
   Tags: [“keylogging”, “C2 beacon”, “suspicious DNS”]
   Confidence: 92%
   ```

---

## 🧰 Tech Stack

| Frontend       | Backend        |      Infra      |
|----------------|----------------|------------------|
| Next.js (AppDir) | FastAPI         | Localhost (dev) |
| ShadCN UI      | `uvicorn`       | Localhost (dev) | 

---

## 🧪 Running Locally

### Backend (FastAPI)

```bash
cd backend
python -m venv env && source env/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```
---

## 📁 File Upload Format

Supported file types:
- `.json`, `.log`
- Example:
```json
{
  "processes": ["cmd.exe", "powershell.exe"],
  "dns_queries": ["suspicious-domain.com"],
  "ip_contacts": ["192.168.1.10"],
  "behaviors": ["keylogging", "screenshotting"]
}
```

---

## 🧠 Verdict Engine

- Custom rule-based classifier + fallback ML model
- Tag extraction and severity analysis
- Optional blockchain log for audit integrity

---

## 💡 Future Scope

- 📊 Threat dashboard
- 🕸️ Graph-based IOC linking
- ☁️ Integration with VirusTotal / HybridAnalysis APIs
- ⛓️ Web3 immutable logging for security ops

---

## 👨‍💻 Built With Love By

Team Solo Levelling – Hackathon Edition 🧠

---

## 🛡️ Disclaimer

**Payload Prism** is a proof-of-concept project. Use responsibly.

---
```

Want me to generate a logo or mockup banner for the repo too?
