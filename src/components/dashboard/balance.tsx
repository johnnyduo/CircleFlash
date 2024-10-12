import { useWallet } from "@/hooks/useWallet";
import { IMAGE_KEY_MAP } from "@/constants/circle";

export function BalanceComponent() {
  const { balances } = useWallet();

  if (!balances) return null;

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-gray-200">Balances</h1>
      <div className="flex flex-col mt-4 max-w-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-gray-200">Token</th>
              <th className="text-right text-gray-200">Balance</th>
            </tr>
          </thead>
          <tbody>
            {balances.tokenBalances && balances.tokenBalances.length > 1 ? (
              balances.tokenBalances.map((token, index) => {
                return (
                  <Balance
                    key={index}
                    tokenName={token.token.name}
                    balance={token.amount}
                  />
                );
              })
            ) : (
              <Balance tokenName={"USDC"} balance={"0"} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Balance = ({
  tokenName,
  balance,
}: {
  tokenName?: string;
  balance: string;
}) => {
  return (
    <tr className="border-b border-gray-500 w-full text-gray-200">
      <td>
        <div className="flex items-center justify-start py-2">
          <img
            // @ts-expect-error
            src={IMAGE_KEY_MAP[tokenName]}
            alt={tokenName}
            className="h-6 w-6"
          />
          <span className="ml-2">{tokenName}</span>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-end">
          <span>{balance}</span>
        </div>
      </td>
    </tr>
  );
};
