import {deployments, ethers, getNamedAccounts} from 'hardhat';

const {execute, read, get} = deployments;

async function main() {

    const {owner} = await getNamedAccounts();

    const MyDefiProject = await get('MyDefiProject');
    console.log(`MyDefiProject: ${MyDefiProject.address}`);


}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
