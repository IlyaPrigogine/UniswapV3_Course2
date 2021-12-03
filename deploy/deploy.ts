import {DeployFunction} from 'hardhat-deploy/types';
import {swapAddress_ropsten} from "../Helpers/constants";


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy,get, read, execute} = deployments;
    const {owner} = await getNamedAccounts();

    console.log('chainId:', await getChainId());
    await deploy('MyDefiProject', {
        from: owner,
        args: [swapAddress_ropsten],
        log: true
    });



};
export default func;
func.tags = ['Greeter'];
