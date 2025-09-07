# AgriTrack - Sonic + Web3 Agri Marketplace

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
4. node server.js

### Frontend
1. cd frontend
2. npm install
3. npm run dev

### AI Service
1. cd ai
2. pip install -r requirements.txt
3. uvicorn predict_service:app --reload --port 8000
