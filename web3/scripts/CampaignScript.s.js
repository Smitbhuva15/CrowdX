
async function main() {
  // fetch contract
  const Campaign=await ethers.getContractFactory('Campaign');

  // deploy campaign contract
   const campaign=await Campaign.deploy();
   await campaign.deployed();
   console.log(`Campaign contract address : ${campaign.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
