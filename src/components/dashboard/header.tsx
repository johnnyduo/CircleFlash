import Link from "next/link";
import Image from 'next/image'

export const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      {/* <div className="bg-clip-text text-3xl lg:text-6xl pb-2 font-bold text-transparent bg-gradient-to-r from-green-300 to-blue-300">
        Circle Flash
      </div> */}

      <div className="mb-4">
        <Image
          src={"/logo.png"}
          width={200}
          height={150}
          alt="CircleFlash"
        ></Image>
      </div>

      <div className="flex flex-row items-center flex-wrap lg:justify-start justify-center gap-4">
        {/* Navbar */}
        <Link href={"/dashboard"} className="text-lg text-gray-200 font-semibold">
          Dashboard
        </Link>
        <Link href={"/dashboard/wallets"} className="text-lg text-gray-200 font-semibold">
          Accounts
        </Link>
        <Link
          href={"/dashboard/transactions"}
          className="text-lg text-gray-200 font-semibold"
        >
          Transactions
        </Link>
        {/* <Link href={"/dashboard/contacts"} className="text-lg text-gray-200 font-semibold">
          Contacts
        </Link> */}
        {/* <Link href={"/dashboard/settings"} className="text-lg text-gray-200 font-semibold">
          Settings
        </Link> */}
      </div>
    </div>
  );
};
