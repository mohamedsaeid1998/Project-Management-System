import { ReactNode, createContext } from "react";

export const AuthContext = createContext({});

interface IProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: IProps) => {


  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

