import {deployments, ethers, getNamedAccounts,network} from 'hardhat';
import {IERC20, MyDefiProject} from "../typechain";
import {getContract, getContractAt} from "@nomiclabs/hardhat-ethers/dist/src/helpers";
import {parseEther} from "ethers/lib/utils";
import {daiAmountIn, daiAmountInMaximum, wethAmountOut} from "../Helpers/constants";

const {execute, read, get} = deployments;

async function main() {

    const {owner} = await getNamedAccounts();

    const MyDefiProject = await ethers.getContract<MyDefiProject>('MyDefiProject');
    console.log(`MyDefiProject: ${await MyDefiProject.address}`);

    if (await network.name === 'ropsten') {
        await MyDefiProject.swapExactInputSingle(parseEther(daiAmountIn));
        await MyDefiProject.swapExactOutputSingle(parseEther(wethAmountOut),parseEther(daiAmountInMaximum));

        await MyDefiProject.swapExactInputMultihop(parseEther(daiAmountIn));
        await MyDefiProject.swapExactInputMultihopV2(parseEther(daiAmountIn));

        await MyDefiProject.swapExactOutputMultiHop(parseEther(wethAmountOut),parseEther(daiAmountInMaximum));
    }
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
