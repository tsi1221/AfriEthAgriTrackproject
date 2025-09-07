const { NFTStorage, File } = require("nft.storage");
require("dotenv").config();

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

async function uploadToIPFS(metadata) {
  const blob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
  const file = new File([blob], "metadata.json");
  const cid = await client.storeBlob(file);
  return `https://ipfs.io/ipfs/${cid}`;
}

module.exports = { uploadToIPFS };
