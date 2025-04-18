# Stage 1: Node.js to install frontend dependencies
FROM node:18-alpine AS frontend-deps
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install

# Stage 2: Final image with Python + Node.js
FROM python:3.11-slim

# Install Node.js and npm manually
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --upgrade pip && pip install -r ./backend/requirements.txt

# Copy backend and frontend code
COPY backend ./backend
COPY frontend ./frontend

# Expose ports
EXPOSE 8000
EXPOSE 3000

# Run both backend and frontend (from /app/frontend, where Next.js expects package.json and src/)
CMD sh -c "cd backend && uvicorn main:app --host 0.0.0.0 --port 8000 --reload & cd frontend && npm run dev"

