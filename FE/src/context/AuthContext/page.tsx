import { Modal, message } from "antd";
import axios from "axios";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { AuthValuesType, TUser } from "../type";
import AuthGuard from "@/auth/AuthGuard";


const defaultProvider: AuthValuesType = {
  user: null,
  setUser: () => null,
  setOpenLogin: () => null,
};
const AuthContext = createContext(defaultProvider);
interface AuthContextProviderProps {
  children: ReactNode;
}

function AuthContextProvder({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<TUser | null>(null);
  const [openLogin, setOpenLogin] = useState<any>(false);

  const handleSaveUser = async () => {
    try {
      await axios.post("http://localhost:5432/api/user/create", user);
    } catch (e) {
      console.log(e);
      message.error("Lỗi lưu user: ", 3);
    }
  };
  //--------------SOCKET------------------

  // -------------------------------------

  useEffect(() => {
    if (user) {
      handleSaveUser();
    }
  }, [user]);
  const getUser = async () => {
    try {
      const url = `http://localhost:5432/auth/google/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      // console.log(">>>Data.", data);
      localStorage.setItem("user", JSON.stringify(data._json));
      setUser(data._json);
    } catch (err) {
      console.log(err);
      message.error("Lỗi get user: ", 3);
    }
  };
  // console.log(">>>STATE..",user);

  useEffect(() => {
    getUser(); // Gọi hàm getUser khi component được mount lần đầu tiên
    return () => {
      localStorage.removeItem('user');
    }
  }, []);

  const googleAuth = () => {
    window.open(`http://localhost:5432/auth/google/callback`, "_self");
  };
  return (
    <>
      <AuthContext.Provider value={{ user, setUser, setOpenLogin }}>
        <AuthGuard setOpenModal={setOpenLogin} >
          {children}
        </AuthGuard>
      </AuthContext.Provider>
      <Modal open={openLogin} onCancel={() => setOpenLogin(false)} onOk={() => console.log("user", user) }>
        <button onClick={googleAuth}>google</button>
      </Modal>
    </>
  );
}

export { AuthContext, AuthContextProvder };
