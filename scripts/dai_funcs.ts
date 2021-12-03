import {deployments, ethers, getNamedAccounts,network} from 'hardhat';
import {IERC20, MyDefiProject} from "../typechain";
import {getContract, getContractAt} from "@nomiclabs/hardhat-ethers/dist/src/helpers";
import {parseEther} from "ethers/lib/utils";
import {daiAmountIn} from "../Helpers/constants";

const {execute, read, get} = deployments;

async function main() {

    const {owner} = await getNamedAccounts();

    const MyDefiProject = await ethers.getContract<MyDefiProject>('MyDefiProject');
    console.log(`MyDefiProject: ${await MyDefiProject.address}`);

    if (await network.name === 'ropsten') {
        await MyDefiProject.swapExactInputSingle(parseEther(daiAmountIn));
    }
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
