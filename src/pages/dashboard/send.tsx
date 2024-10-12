import { Layout } from "@/components/dashboard/layout";
import { useWallet } from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import { Dropdown } from "@/components/dropdown";
import invariant from "ts-invariant";
import { toast } from "react-toastify";
import { CIRCLE_APP_ID } from "@/constants/circle";
import { useRouter } from "next/router";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { useContact } from "@/hooks/useContact";
import { Drop, User } from "@phosphor-icons/react";
import { isValidEthereumAddress } from "@/utils/eth";
import Link from "next/link";
import { iban2wallet } from "@/utils/iban";
import WormholeConnect, {
  WormholeConnectConfig,
} from '@wormhole-foundation/wormhole-connect';

const config: WormholeConnectConfig = {
  network: 'Testnet',
  chains: ['Sepolia', 'ArbitrumSepolia', 'BaseSepolia'],
  rpcs: {
    Sepolia: 'https://rpc.ankr.com/eth_sepolia',
    BaseSepolia: 'https://base-sepolia-rpc.publicnode.com',
    ArbitrumSepolia: 'https://sepolia-rollup.arbitrum.io/rpc',
  },
};

export default function SendPage() {
  return (
    <Layout title="Send Transaction">
      <Send />
    </Layout>
  );
}

let CircleClient: W3SSdk;

function Send() {
  const { balances, sendTransaction, encryptionKey, userToken } = useWallet();
  const { contacts, addContact } = useContact();
  const [_to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [bridgeMode, setBridgeMode] = useState(false)
  const router = useRouter();

  useEffect(() => {
    CircleClient = new W3SSdk();
  }, []);

  useEffect(() => {
    if (balances) {
      setTokenId(
        balances.tokenBalances?.find(
          (b) => b.token.name === 'USDC'
        )?.token.id || ""
      )
    }
  }, [balances])

  if (!balances || !balances.tokenBalances) return null;

  async function handleSubmit() {
    // find balance amount of tokenid and check if amount is less than balance
    let to = isValidEthereumAddress(_to) ? _to : iban2wallet(_to)

    if (!to || !isValidEthereumAddress(to)) {
      toast.error("Invalid bank account");
      return;
    }

    // @ts-expect-error
    let balance = balances.tokenBalances.find((b) => b.token.id === tokenId);
    invariant(balance, "Token ID not found");

    if (Number(amount) > Number(balance.amount)) {
      toast.error("Amount exceeds balance");
      return;
    }

    sendTransaction(amount, to, tokenId)
      .then((txId) => {
        return new Promise((resolve, reject) => {
          CircleClient.setAppSettings({
            appId: CIRCLE_APP_ID,
          });

          CircleClient.setAuthentication({
            encryptionKey,
            userToken,
          });

          CircleClient.execute(txId, (error) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(txId);
          });
        });
      })
      .then(() => {
        toast.success("Transaction sent successfully");
        router.push("/dashboard");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {!bridgeMode && <>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Send Transaction</h2>
            <div className="text-sm text-gray-300">
              Send tokens to another bank account
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="to">To (IBAN or Wallet)</label>
            <div className="flex flex-row gap-2 items-center">
              <input
                id="to"
                type="text"
                value={_to}
                onChange={(e) => setTo(e.target.value)}
                className="px-3 py-2 rounded-lg text-black w-full"
                placeholder="Recipient IBAN or Wallet"
                style={{ maxWidth: 480 }}
              />
              <div className="hidden lg:block">
                {contacts.length > 0 && (
                  <Dropdown
                    activeItem={"Contacts"}
                    title="Contacts"
                    items={contacts.map((c) => c.name)}
                    onItemChange={(item) => {
                      let contact = contacts.find((c) => c.name === item);
                      invariant(contact, "Contact not found");

                      setTo(contact.address);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="amount">Amount</label>
            <div>
              <input
                id="amount"
                type="text"
                // only accept numbers
                pattern="[0-9]*"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="px-3 py-2 rounded-lg text-black w-full"
                style={{ maxWidth: 480 }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="tokenId">Token</label>
            <div className="max-w-52 w-full">
              <Dropdown
                // @ts-expect-error
                activeItem={
                  balances.tokenBalances.find((b) => b.token.id === tokenId)
                    ?.token.name
                }
                // @ts-expect-error
                items={balances.tokenBalances.map((b) => b.token.name)}
                onItemChange={(item) => {
                  // @ts-expect-error
                  let id = balances.tokenBalances.find(
                    (b) => b.token.name === item
                  )?.token.id;

                  invariant(id, "Token ID not found");

                  setTokenId(id);
                }}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={!_to || !amount || !tokenId}
              className="bg-gray-800 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700 disabled:bg-opacity-50 disabled:bg-gray-800 disabled:hover:bg-opacity-50"
            >
              Send
            </button>

            <button
              onClick={() => setBridgeMode(true)}
              className="bg-gray-800 text-white px-3 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-700 disabled:bg-opacity-50 disabled:bg-gray-800 disabled:hover:bg-opacity-50"
            >
              Bridge
            </button>
          </div>
        </>}
        
        {bridgeMode &&
          <div className="flex">
            <WormholeConnect config={config} />
          </div>
        }
      </div>
    </>
  );
}
