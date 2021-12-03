import {DeployFunction} from 'hardhat-deploy/types';


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy,get, read, execute} = deployments;
    const {owner} = await getNamedAccounts();

    console.log('chainId:', await getChainId());
    await deploy('MyDefiProject', {
        from: owner,
        args: [],
        log: true
    });

    const MyDefiProject = await get('MyDefiProject');
    console.log(`MyDefiProject: ${MyDefiProject.address}`);
    console.log(`MyDefiProject: ${MyDefiProject.address}`);

};
export default func;
func.tags = ['Greeter'];
