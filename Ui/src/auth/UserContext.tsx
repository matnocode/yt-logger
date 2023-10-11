import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { User } from "../model/user";
import { getUser } from "../api/user";

interface Props {
  sessionUser?: User;
  loginSuccess: () => void;
}

const userContext = createContext<Props | undefined>(undefined);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sessionUser, setSessionUser] = useState<User>();

  const loginSuccess = async () => {
    try {
      let user = await getUser();
      setSessionUser(user);
    } catch {}
  };

  const value = useMemo<Props>(
    () => ({ sessionUser: sessionUser, loginSuccess: loginSuccess }),
    [sessionUser, loginSuccess, setSessionUser]
  );

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

const useUserContext = () => {
  let context = useContext(userContext);
  if (context === undefined) throw new Error("userContext is undefined");
  return context;
};

export default useUserContext;
