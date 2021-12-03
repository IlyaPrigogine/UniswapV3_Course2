import {deployments, ethers, getNamedAccounts,network} from 'hardhat';
import {IERC20, MyDefiProject} from "../typechain";
import {getContract, getContractAt} from "@nomiclabs/hardhat-ethers/dist/src/helpers";

const {execute, read, get} = deployments;

async function main() {

    const {owner} = await getNamedAccounts();

    const MyDefiProject = await ethers.getContract<MyDefiProject>('MyDefiProject');
    console.log(`MyDefiProject: ${await MyDefiProject.address}`);

    if (await network.name === 'ropsten') {




        // const dai = await ethers.getContractAt<IERC20>('IERC20',dai_ropsten);
        // await dai.approve(MyDefiProject.address,parseEther(initialApproveAmount));
        //
        // const weth = await ethers.getContractAt<IERC20>('IERC20',weth_ropsten);
        // await weth.approve(MyDefiProject.address,parseEther(initialApproveAmount));

        // await MyDefiProject.swapExactInputSingle(parseEther(daiAmountIn));
        // await MyDefiProject.swapExactOutputSingle(parseEther(wethAmountOut),parseEther(daiAmountInMaximum));
    }
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
