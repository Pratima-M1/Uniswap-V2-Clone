# UniswapV2 Deployment

This repository provides scripts and contracts for deploying Uniswap V2 contracts, adding liquidity to a new pair, and performing token swaps.

### Contracts

`core/UniswapV2Factory.sol `: Core Factory Contract of Uniswap V2

`core/UniswapV2Pair.sol` : Core Pair Contract of Uniswap V2

`periphery/UniswapV2Router02.sol` : Router Contract of Uniswap V2

`USDT.sol` : ERC-20 Token Contract for Tether

`USDC.sol` : ERC-20 Token Contract for USD Coin

`core/interfaces/IUniswapV2Pair.sol` : Interface for Uniswap V2 Pair Contract

### Install & Test

Installation

```bash
git clone https://github.com/Prodigal-Blockchain/Uniswap-V2-Clone.git
cd Uniswap-V2-Clone
```

### Deployment

1. Replace .env.example with .env and replace

   - RPC_URL=
   - PRIVATE_KEY=
   - ETHERSCAN_API=

2. To deploy and mint security token and fractionalize , sell shares of asset run

```sh
npx hardhat run scripts/01_deployContracts.js --netowrk NETWORK
```

3.To swap token replace all addresses woth deployed addresses

- const USDT_ADDRESS = "";
- const USDC_ADDRESS = "";
- const ROUTER_ADDRESS = "";

```sh
npx hardhat run scripts/swap.js --netowrk NETWORK
```

Replace NETWORK valide network of your choice (ex: sepolia or base-sepolia)

### Deployment Address on base-sepolia

- **USDC ERC20 Contract** : [0x409744140C4044f373b640FBe974B420fab015D9](https://sepolia.basescan.org/address/0x409744140C4044f373b640FBe974B420fab015D9)
- **USDC ERC20 Contract** : [0x4DA8C402F46380f950cAbc91EA38159B4c90ddDE](https://sepolia.basescan.org/address/0x4DA8C402F46380f950cAbc91EA38159B4c90ddDE)
- **UniswapV2Factory** : [0x41c9D51929D6Eddf23901c1A7D16722C3dEC3889](https://sepolia.basescan.org/address/0x41c9D51929D6Eddf23901c1A7D16722C3dEC3889)
- **UniswapV2Pair** : [0xDeE017292f6Bd463960B792328ec6c44783fb38e](https://sepolia.basescan.org/address/0xDeE017292f6Bd463960B792328ec6c44783fb38e)
- **UniswapV2Router02** : [0x4602443267BB60Ec6692d371954a60ED87F20884](https://sepolia.basescan.org/address/0x4602443267BB60Ec6692d371954a60ED87F20884)
- **WETH** : [0x4200000000000000000000000000000000000006](https://sepolia.basescan.org/address/0x4200000000000000000000000000000000000006)
- **Create Pair** : [0xDeE017292f6Bd463960B792328ec6c44783fb38e](https://sepolia.basescan.org/address/0xDeE017292f6Bd463960B792328ec6c44783fb38e)
- **Add Liquidity** : [addLiquidity](https://sepolia.basescan.org/tx/0xc1c4bfe3c8ab234f46d28d7a16cc2dfb7d8f556c8e6da838349ff5f717397bae)
- **swapExactTokenForTokens** :[swapExactTokenForTokens](https://sepolia.basescan.org/tx/0xdc1aa9194693401bda3659a6c0176dacd982d0be312b1161507f3ff84ae95b7b)
- **swapTokensForExactTokens** :[swapTokensForExactTokens](https://sepolia.basescan.org/tx/0xe92eb8c8cf941e724b874bdc616ee964169f81d4277d3fd209ee8a7683d62ef9)
