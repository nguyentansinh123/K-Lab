import { useEffect, useRef, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatch";
import { checkCurrentUser } from "./AuthSlice";

type AuthInitializerProps = {
  children: ReactNode;
};

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const didCheck = useRef(false);
  const dispatch = useAppDispatch();
  const { accessToken, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (didCheck.current || !accessToken || status !== "checking") {
      return;
    }

    didCheck.current = true;
    dispatch(checkCurrentUser());
  }, [accessToken, dispatch, status]);

  return children;
}
