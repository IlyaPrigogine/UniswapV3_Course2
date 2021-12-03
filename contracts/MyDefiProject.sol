// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.4;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

contract MyDefiProject {
    ISwapRouter public immutable swapRouter;

    address public constant DAI = 0xaD6D458402F60fD3Bd25163575031ACDce07538D;
    address public constant WETH9 = 0xc778417E063141139Fce010982780140Aa0cD5Ab;
    address public constant USDC = 0x07865c6E87B9F70255377e024ace6630C1Eaa37F;

    uint24 public constant poolFee = 3000;

    constructor (ISwapRouter swapRouter_) {
        swapRouter = swapRouter_;
    }

    function swapExactInputSingle(uint256 amountIn) external returns (uint256 amountOut) {
        TransferHelper.safeTransferFrom(DAI, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(DAI, address (swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn : DAI,
            tokenOut : WETH9,
            fee : poolFee,
            recipient : msg.sender,
            deadline : block.timestamp,
            amountIn : amountIn,
            amountOutMinimum : 0,
            sqrtPriceLimitX96 : 0
        });

        amountOut = swapRouter.exactInputSingle(params);
    }

    function swapExactOutputSingle(uint256 amountOut, uint256 amountInMaximum) external returns (uint256 amountIn) {
        TransferHelper.safeTransferFrom(DAI, msg.sender, address (this), amountInMaximum);
        TransferHelper.safeApprove(DAI, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params =
        ISwapRouter.ExactOutputSingleParams({
        tokenIn : DAI,
        tokenOut: WETH9,
        fee: poolFee,
        recipient: msg.sender,
        deadline: block.timestamp,
        amountOut: amountOut,
        amountInMaximum: amountInMaximum,
        sqrtPriceLimitX96: 0
        });

        amountIn = swapRouter.exactOutputSingle(params);

        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(DAI, address (swapRouter),0);
            TransferHelper.safeTransfer(DAI, msg.sender, amountInMaximum - amountIn);
        }
    }

    /* inital queue = dai -> usdc -> weth9 */
    function swapExactInputMultihop(uint256 amountIn) external returns(uint256 amountOut) {
        TransferHelper.safeTransferFrom(DAI, msg.sender, address (this), amountIn);
        TransferHelper.safeApprove(DAI, address (swapRouter), amountIn);

        ISwapRouter.ExactInputParams memory params =
        ISwapRouter.ExactInputParams({
        path: abi.encodePacked(DAI, poolFee, USDC, poolFee, WETH9),
        recipient : msg.sender,
        deadline: block.timestamp,
        amountIn: amountIn,
        amountOutMinimum: 0
        });

        amountOut = swapRouter.exactInput(params);
    }

    /*v2: dai -> weth9 -> usdc */
    function swapExactInputMultihopV2(uint256 amountIn) external returns(uint256 amountOut) {
        TransferHelper.safeTransferFrom(DAI, msg.sender, address (this), amountIn);
        TransferHelper.safeApprove(DAI, address (swapRouter), amountIn);

        ISwapRouter.ExactInputParams memory params =
        ISwapRouter.ExactInputParams({
        path: abi.encodePacked(DAI, poolFee, WETH9, poolFee, USDC),
        recipient : msg.sender,
        deadline: block.timestamp,
        amountIn: amountIn,
        amountOutMinimum: 0
        });

        amountOut = swapRouter.exactInput(params);
    }

    function swapExactOutputMultiHop(uint256 amountOut, uint256 amountInMaximum) external returns (uint256 amountIn) {
        TransferHelper.safeTransferFrom(DAI, msg.sender, address(this), amountInMaximum);
        TransferHelper.safeApprove(DAI, address (swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputParams memory params =
        ISwapRouter.ExactOutputParams({
        path: abi.encodePacked(WETH9, poolFee, USDC, poolFee, DAI),
        recipient: msg.sender,
        deadline: block.timestamp,
        amountOut: amountOut,
        amountInMaximum : amountInMaximum
        });

        amountIn = swapRouter.exactOutput(params);

        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(DAI, address (swapRouter), 0);
            //            TransferHelper.safeTransferFrom(DAI, address (this), msg.sender, amountInMaximum - amountIn);
            TransferHelper.safeTransfer(DAI, msg.sender, amountInMaximum - amountIn);
        }
    }

}
