import useAuth from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

type TAuthGuard = {
  children: React.ReactNode;
  setOpenModal: (value: boolean) => void;
};

const AuthGuard = (props: TAuthGuard) => {
  const router = useRouter();
  const pathname = usePathname();
  // const { user } = useAuth();
  const userString = window.localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  useEffect(() => {
    
    if (user === null) {
      if (pathname !== "/") {
        router.replace("/");
      }
      props.setOpenModal(true);
    }
  }, [pathname, user]);
  return <>{props.children}</>;
};

export default AuthGuard;
