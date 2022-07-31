const { ethers } = require('hardhat');



async function main() {

    [deployer] = await ethers.getSigners()
    
    const ZongICO = await hre.ethers.getContractFactory("zongICO");
    const zongICO = await ZongICO.deploy(deployer.address);
  
    await zongICO.deployed();

    console.log('The Contract is deployed at', zongICO.address);

    const admin = await zongICO.admin()
    console.log(admin)

    const adminBalance = await zongICO.balanceOf(admin)
    console.log(adminBalance)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
