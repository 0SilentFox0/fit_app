import React, { createContext, useContext, useState, ReactNode } from 'react';

type AccountType = 'client' | 'admin';

interface AccountContextType {
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
  isAdmin: boolean;
  isClient: boolean;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
  const [accountType, setAccountType] = useState<AccountType>('client');

  const value: AccountContextType = {
    accountType,
    setAccountType,
    isAdmin: accountType === 'admin',
    isClient: accountType === 'client',
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
}; 