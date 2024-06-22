// Importing required modules and libraries from the ethers.js library.
const { Contract, ContractFactory } = require("ethers");

// Importing the contract JSON artifacts.
const USDT_ADDRESS = "0x409744140C4044f373b640FBe974B420fab015D9";
const USDC_ADDRESS = "0x4DA8C402F46380f950cAbc91EA38159B4c90ddDE";
const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";
const FACTORY_ADDRESS = "0x41c9D51929D6Eddf23901c1A7D16722C3dEC3889";
const ROUTER_ADDRESS = "0x4602443267BB60Ec6692d371954a60ED87F20884";
const PAIR_ADDRESS = "0xDeE017292f6Bd463960B792328ec6c44783fb38e";
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
