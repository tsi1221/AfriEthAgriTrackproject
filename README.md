AgriTrack – Sonic + Web3 Agricultural Marketplace 🌾🚀

A blockchain-powered platform that empowers African smallholder farmers to sell crops directly, transparently, and securely using Sonic blockchain and Web3 technologies.

Overview

AgriTrack is a Web3-enabled agricultural marketplace designed to:

Connect smallholder farmers directly with buyers.

Ensure transparent and secure transactions through the Sonic blockchain.

Provide AI-powered insights for optimal crop pricing and yield predictions.

Integrate NFT-based crop tracking for verification and authenticity.

Project Vision

Our mission is to digitally empower farmers in Africa, minimize exploitation by middlemen, and increase transparency in agricultural trade, leveraging the combined power of Web3, AI, and blockchain technologies.

Tech Stack

Frontend: React (Vite)

Backend: Node.js + Express

Blockchain: Sonic Testnet, Hardhat, Ethers.js

AI Service: Python + FastAPI + Uvicorn

Storage & NFTs: NFT.Storage

Database: MongoDB / Atlas

Infrastructure: Docker, Kubernetes, SSL for secure deployments

Key Features

🔹 Blockchain-backed Transactions: Secure, transparent, and immutable crop sales.

🔹 AI-driven Insights: Crop price predictions and optimal selling strategies.

🔹 NFT Crop Tracking: Digital verification for each batch of produce.

🔹 Web3 Wallet Integration: Seamless Sonic blockchain payments.

🔹 Scalable Architecture: Containerized deployment using Docker & Kubernetes.

Benefits

Fair Pricing: Eliminates middlemen to maximize farmer profits.

Data-Driven Decisions: AI insights help farmers sell at optimal times.

Trust & Transparency: NFT verification ensures authentic produce for buyers.

Scalable & Secure: Ready for regional expansion across Africa.

## Setup

### Contracts
1. cd contracts
2. npm install
npm init -y
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers dotenv
npx hardhat init

3. npx hardhat compile
4. npx hardhat run --network sonicTestnet deploy.js

### Backend
1. cd backend
2. npm install
3. Set .env keys:
   SONIC_TESTNET_RPC=
   DEPLOYER_PRIVATE_KEY=
   CONTRACT_ADDRESS=
   NFT_STORAGE_KEY=
   DataBaseUrl=
4. node server.js

### Frontend
1. cd frontend
2. npm install
3. npm run dev

### AI Service
1. cd ai
2. pip install -r requirements.txt
3. uvicorn predict_service:app --reload --port 8000


### Infrasturacture
docker build -t tbiruh1221/frontend:latest ../frontend
docker build -t tbiruh1221/backend:latest ../backend
docker build -ttbiruh1221/ai:latest ../ai

docker push tbiruh1221//frontend:latest
docker push tbiruh1221//backend:latest
docker push tbiruh1221//ai:latest

kubectl apply -f frontend-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f ai-deployment.yaml
