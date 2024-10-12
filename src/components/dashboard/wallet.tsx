import { useWallet } from "@/hooks/useWallet";
import { iban } from "@/utils/iban";
import { useMemo } from "react";
import { useRouter } from "next/router";

export function WalletsComponent() {
  const { wallets, wallet, changeWallet } = useWallet();
  const router = useRouter()

  // const mapableWallets = useMemo(() => {
  //   // filter wallet from wallets
  //   return wallets.filter((w) => w.address !== wallet?.address);
  // }, [wallets, wallet]);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">Bank Accounts</h1>
      <div className="max-w-3xl">
        {wallets.map((wallet) => (
          <div
            className="flex flex-col justify-between py-3 border-b border-gray-200"
            key={wallet.address}
          >
            <h2 className="text-lg font-semibold">{wallet.name}</h2>
            <div className="text-sm text-gray-300">{wallet.refId}</div>
            <div className="text-sm text-gray-300 mt-1">IBAN: {iban(wallet.address)}</div>
            <button
              onClick={() => {
                changeWallet(wallet.id)
                router.push('/dashboard')
              }}
              className="text-lg font-semibold text-left mt-2"
            >
              Switch to this account
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
