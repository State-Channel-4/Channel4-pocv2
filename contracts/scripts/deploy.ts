import { ethers } from "hardhat";
import { firstTag } from "../constants";

async function main() {

  const UrlContract = await ethers.getContractFactory("UrlContract");
  const urlContract = await UrlContract.deploy(firstTag);

  await urlContract.deployed();

  console.log(`UrlContract deployed to ${urlContract.address} with first tag ${firstTag}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
