// Importing required modules and libraries from the ethers.js library.
const { Contract, ContractFactory } = require("ethers");

// Importing the contract JSON artifacts.
const USDT_ADDRESS = "";
const USDC_ADDRESS = "";
const WETH_ADDRESS = "";
const FACTORY_ADDRESS = "";
const ROUTER_ADDRESS = "";
const PAIR_ADDRESS = "";
const { ethers } = require("hardhat");

// Main deployment function.
async function main() {
  // 1. Retrieve signers from the ethers provider.
  const [owner] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${owner.address}`);
  await hre.run("verify:verify", {
    address: USDT_ADDRESS,
    constructorArguments: [],
    contract: "contracts/USDT.sol:Tether",
  });

  await hre.run("verify:verify", {
    address: USDC_ADDRESS,
    constructorArguments: [],
    contract: "contracts/USDC.sol:UsdCoin",
  });

  await hre.run("verify:verify", {
    address: FACTORY_ADDRESS,
    constructorArguments: [owner.address],
    contract: "contracts/core/UniswapV2Factory.sol:UniswapV2Factory",
  });
  await hre.run("verify:verify", {
    address: ROUTER_ADDRESS,
    constructorArguments: [FACTORY_ADDRESS, WETH_ADDRESS],
    contract: "contracts/periphery/UniswapV2Router02.sol:UniswapV2Router02",
  });
  await hre.run("verify:verify", {
    address: PAIR_ADDRESS,
    constructorArguments: [],
    contract: "contracts/core/UniswapV2Pair.sol:UniswapV2Pair",
  });
}
// Executing the main function and handling possible outcomes.
main()
  .then(() => process.exit(0)) // Exiting the process if deployment is successful.
  .catch((error) => {
    console.error(error); // Logging any errors encountered during deployment.
    process.exit(1); // Exiting the process with an error code.
  });
