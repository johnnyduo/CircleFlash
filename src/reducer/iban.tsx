import { useWallet } from '@/hooks/useWallet';
import { iban, swift } from '@/utils/iban';
import { EdgeAction, useEdgeReducerV0 } from '@turbo-ing/edge-v0';
import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';

// Define types for the state
interface IbanState {
  iban: { [iban: string]: string }; // Replaced Map with an object
}

// Define the initial state
const initialState: IbanState = {
  iban: {}, // Initial state is an empty object
};

// Define action types
enum ActionType {
  IMPORT_AND_MERGE_IBAN = 'IMPORT_AND_MERGE_IBAN',
}

// Define the shape of actions
interface ImportAndMergeIbanAction extends EdgeAction<IbanState> {
  type: ActionType.IMPORT_AND_MERGE_IBAN;
  payload: { [iban: string]: string };
}

type IbanActions = ImportAndMergeIbanAction;

// Create the reducer function
function ibanReducer(state: IbanState, action: IbanActions): IbanState {
  switch (action.type) {
    case ActionType.IMPORT_AND_MERGE_IBAN:
      // Merge the new IBANs with the existing IBANs

      for (const iban in action.payload) {
        const ethAddress = action.payload[iban]
        window.localStorage.setItem(`IBAN:${iban.replaceAll(' ', '')}`, ethAddress)
        swift(iban)
      }

      return {
        ...state,
        iban: {
          ...state.iban,
          ...action.payload, // Spread new entries to merge with the current state
        },
      };
    default:
      return state;
  }
}

// Define the context type
interface IbanContextProps {
  state: IbanState;
  importAndMergeIban: (newIban: { [iban: string]: string }) => void;
}

// Create the context
const IbanContext = createContext<IbanContextProps | undefined>(undefined);

// Create the provider component
interface IbanProviderProps {
  children: ReactNode;
}

export function IbanProvider({ children }: IbanProviderProps) {
  const { wallets } = useWallet();

  const [state, dispatch, connected] = useEdgeReducerV0(ibanReducer, initialState, {
    topic: 'circle-flash',
  });

  // Function to import and merge IBANs
  const importAndMergeIban = (newIban: { [iban: string]: string }) => {
    dispatch({
      type: ActionType.IMPORT_AND_MERGE_IBAN,
      payload: newIban,
    });
  };

  useEffect(() => {
    if (connected && wallets.length > 0) {
      const data: {[iban: string]: string} = {}
      for (const wallet of wallets) {
        data[iban(wallet.address)] = wallet.address
      }
      importAndMergeIban(data)
    }
  }, [wallets, connected])

  console.log(state)

  return (
    <IbanContext.Provider value={{ state, importAndMergeIban }}>
      {children}
    </IbanContext.Provider>
  );
}

// Custom hook to use the IBAN context
export function useIbanContext() {
  const context = useContext(IbanContext);
  if (context === undefined) {
    throw new Error('useIbanContext must be used within an IbanProvider');
  }
  return context;
}