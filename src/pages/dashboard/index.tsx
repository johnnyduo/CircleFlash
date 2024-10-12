import { BalanceComponent } from "@/components/dashboard/balance";
import { Layout } from "@/components/dashboard/layout";
import { Dropdown } from "@/components/dropdown";
import { useWallet } from "@/hooks/useWallet";
import { iban, swift } from "@/utils/iban";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import invariant from "ts-invariant";
import { useLocalStorage } from "usehooks-ts";

export default function Dashboard() {
  return (
    <Layout title="Dashboard">
      <DashboardComponent />
    </Layout>
  );
}

function DashboardComponent() {
  const { wallet, requestTokens, signout } = useWallet();
  const [, setContacts] = useLocalStorage("contacts", []);
  const router = useRouter();
  return (
    <>
      {wallet && (
        <>
          <div className="flex flex-col gap-4">
            {/* Show wallet info */}
            {wallet && (
              <div className="flex flex-col gap-2">
                {/* Welcome back */}
                <h2 className="text-2xl font-semibold text-gray-200">
                  Welcome back, {wallet.name}
                </h2>
                {/* Description */}
                {/* <div className="text-sm text-gray-500">
                  Wallet Type: {wallet.accountType}
                </div> */}
                <div className="text-sm text-gray-200">
                  IBAN: {iban(wallet.address)}
                </div>
                <div className="text-sm text-gray-200">
                  SWIFT: {swift(iban(wallet.address))}
                </div>
                {/* Address */}
                <div
                  className="text-sm text-gray-300 hover:underline cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(wallet.address);
                    toast.success("Copied to clipboard");
                  }}
                >
                  Linked Address: {wallet.address}
                </div>
                <div className="mt-3 flex flex-row gap-2 items-center">
                  <div>
                    <Link
                      href={"/dashboard/send"}
                      className=" bg-gray-800 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700"
                    >
                      Transfer
                    </Link>
                  </div>
                  <div>
                    <a
                      href="https://faucet.circle.com/"
                      target="_blank"
                      className="bg-gray-800 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700"
                    >
                      Request Tokens
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Show wallet balance */}
          <BalanceComponent />

          <div>
            <button
              onClick={() => {
                setContacts([]);
                signout();
              }}
              className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-red-400"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </>
  );
}
