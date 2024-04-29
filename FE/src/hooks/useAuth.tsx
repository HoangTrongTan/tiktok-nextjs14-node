import { AuthContext } from "@/context/AuthContext/page";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);

export default useAuth;
