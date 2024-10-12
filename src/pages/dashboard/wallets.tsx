import { Layout } from "@/components/dashboard/layout";
import { WalletsComponent } from "@/components/dashboard/wallet";
import { Dropdown } from "@/components/dropdown";
import { useWallet } from "@/hooks/useWallet";
import Link from "next/link";
import { toast } from "react-toastify";
import invariant from "ts-invariant";

export default function WalletsPage() {
  return (
    <Layout title="Wallets">
      <Wallets />
    </Layout>
  );
}

function Wallets() {
  const { wallet } = useWallet();

  return (
    <>
      {/* Create Wallet */}
      <Link href={"/dashboard/create-wallet"}>
        <button className="mt-3 bg-gray-800 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700">
          Open Bank Account
        </button>
      </Link>

      <WalletsComponent />
    </>
  );
}
