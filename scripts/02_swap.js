// Importing required modules and libraries from the ethers.js library.
const { Contract, ContractFactory } = require("ethers");

// Importing the contract JSON artifacts.
// Contract addresses<Replace with deployed addresses>
const USDT_ADDRESS = "";
const USDC_ADDRESS = "";
const ROUTER_ADDRESS = "";
const routerArtifact = require("../artifacts/contracts/periphery/UniswapV2Router02.sol/UniswapV2Router02.json");
const usdtArtifact = require("../artifacts/contracts/USDT.sol/Tether.json");
const usdcArtifact = require("../artifacts/contracts/USDC.sol/UsdCoin.json");
const { ethers } = require("hardhat");

// Main deployment function.
async function main() {
  // 1. Retrieve signers from the ethers provider.
  const [owner] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${owner.address}`);

  const usdt = new Contract(USDT_ADDRESS, usdtArtifact.abi, owner);
  const usdc = new Contract(USDC_ADDRESS, usdcArtifact.abi, owner);

  const router = new Contract(ROUTER_ADDRESS, routerArtifact.abi, owner);

  // Approving the Uniswap router to spend USDT on owner's behalf
  const approveTx = await usdt
    .connect(owner)
    .approve(ROUTER_ADDRESS, ethers.parseUnits("2", 18));
  await approveTx.wait();
  let usdtBalance = await usdt.balanceOf(owner.address);
  let usdcBalance = await usdc.balanceOf(owner.address);
  console.log(
    `Before Swap: USDC balance = ${usdcBalance}, USDT balance = ${usdtBalance}`
  );

  console.log("Swapping for exact input tokens.....");
  //For exact input token swap
  // Performing the swap on Uniswap: USDT for USDC for swapExactTokensForTokens
  const tx0 = await router
    .connect(owner)
    .swapExactTokensForTokens(
      ethers.parseUnits("1", 18),
      0,
      [USDT_ADDRESS, USDC_ADDRESS],
      owner.address,
      Math.floor(Date.now() / 1000) + 60 * 10,
      {
        gasLimit: 1000000,
      }
    );
  await tx0.wait();
  console.log("Swapped for exact input token..........");
  usdtBalance = await usdt.balanceOf(owner.address);
  usdcBalance = await usdc.balanceOf(owner.address);
  console.log(
    `After Swap: USDC balance = ${usdcBalance}, USDT balance = ${usdtBalance}`
  );
  console.log("Swapping for exact output tokens.....");
  usdtBalance = await usdt.balanceOf(owner.address);
  usdcBalance = await usdc.balanceOf(owner.address);
  console.log(
    `Before Swap: USDC balance = ${usdcBalance}, USDT balance = ${usdtBalance}`
  );
  //For exact output token swap
  // Performing the swap on Uniswap: USDT for USDC for swapTokensForExactTokens
  const tx1 = await router
    .connect(owner)
    .swapTokensForExactTokens(
      ethers.parseUnits("0.1", 18),
      ethers.parseUnits("1", 18),
      [USDT_ADDRESS, USDC_ADDRESS],
      owner.address,
      Math.floor(Date.now() / 1000) + 60 * 10,
      {
        gasLimit: 1000000,
      }
    );

  // Waiting for the swap transaction to be confirmed
  await tx1.wait();
  console.log("Swapped..........");
  usdtBalance = await usdt.balanceOf(owner.address);
  usdcBalance = await usdc.balanceOf(owner.address);
  console.log(
    `After Swap: USDC balance = ${usdcBalance}, USDT balance = ${usdtBalance}`
  );
}

// This command is used to run the script using hardhat.
// npx hardhat run --network localhost scripts/01_deployContracts.js

// Executing the main function and handling possible outcomes.
main()
  .then(() => process.exit(0)) // Exiting the process if deployment is successful.
  .catch((error) => {
    console.error(error); // Logging any errors encountered during deployment.
    process.exit(1); // Exiting the process with an error code.
  });
