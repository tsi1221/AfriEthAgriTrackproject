const hre = require("hardhat");

async function main() {
  const AgriReceipts = await hre.ethers.getContractFactory("AgriReceipts");
  const contract = await AgriReceipts.deploy();
  await contract.deployed();
  console.log("AgriReceipts deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
