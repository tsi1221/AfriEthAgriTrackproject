const express = require("express");
const router = express.Router();
const { uploadToIPFS } = require("../services/ipfs");
const { ethers } = require("ethers");
require("dotenv").config();

// Example: process payment + mint NFT receipt
router.post("/mint", async (req, res) => {
  try {
    const { farmerAddress, crop, qty, price, buyerAddress } = req.body;

    // Prepare metadata
    const metadata = {
      name: `AgriTrack Receipt`,
      description: `Receipt for ${qty}kg ${crop}`,
      attributes: [
        { trait_type: "farmer", value: farmerAddress },
        { trait_type: "crop", value: crop },
        { trait_type: "amount", value: `${qty}kg` },
        { trait_type: "price", value: `${price} ETB` }
      ],
      timestamp: new Date().toISOString(),
    };

    const ipfsURL = await uploadToIPFS(metadata);

    // Mint NFT via Sonic RPC
    const provider = new ethers.JsonRpcProvider(process.env.SONIC_TESTNET_RPC);
    const wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
    const abi = [
      "function mintReceipt(address farmer, string calldata metadataURI) external returns (uint256)"
    ];
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);
    const tx = await contract.mintReceipt(farmerAddress, ipfsURL);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash, ipfsURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
