import {DeployFunction} from 'hardhat-deploy/types';
import {dai_ropsten, initialApproveAmount, swapAddress_ropsten, usdc_ropsten, weth_ropsten} from "../Helpers/constants";
import {ethers} from 'hardhat';
import {IERC20} from "../typechain";
import {parseEther} from "ethers/lib/utils";


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy,get, read, execute} = deployments;
    const {owner} = await getNamedAccounts();

    console.log('chainId:', await getChainId());
    const MyDefiProject = await deploy('MyDefiProject', {
        from: owner,
        args: [swapAddress_ropsten],
        log: true
    });

    if (network.name == 'ropsten') {
        const dai = await ethers.getContractAt<IERC20>('IERC20',dai_ropsten);
        await dai.approve(MyDefiProject.address,parseEther(initialApproveAmount));

        const weth = await ethers.getContractAt<IERC20>('IERC20',weth_ropsten);
        await weth.approve(MyDefiProject.address,parseEther(initialApproveAmount));

        const usdc = await ethers.getContractAt<IERC20>('IERC20',usdc_ropsten);
        await usdc.approve(MyDefiProject.address,parseEther(initialApproveAmount));
    };



};
export default func;
func.tags = ['Greeter'];
