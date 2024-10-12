// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI: bigint = 1_000_000_000n;

const SwiftMessageOracleModule = buildModule("SwiftMessageOracleModule", (m) => {
  const admin = m.getAccount(0)

  const usdc = m.contract("FakeUSDC", [])
  const oracle = m.contract("SwiftMessageOracle", [admin])

  return { usdc, oracle };
});

export default SwiftMessageOracleModule;
