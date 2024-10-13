import { WalletProvider } from "@/context/WalletContext";
import { Header } from "./header";
import { ContactProvider } from "@/context/ContactContext";
import { IbanProvider } from "@/reducer/iban";

export const Layout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <ContactProvider>
      <WalletProvider>
        <IbanProvider>
          <div className="flex flex-col items-center min-h-screen py-12">
            <div className="container flex flex-col gap-6 mx-auto px-4 text-gray-200">
              <Header title={title} />
              {children}
            </div>
          </div>
        </IbanProvider>
      </WalletProvider>
    </ContactProvider>
  );
};
