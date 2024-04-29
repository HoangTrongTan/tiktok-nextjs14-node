import { TData } from "@/hooks/useDebounce";
export type TUser = {
    email: string,
    name: string,
    picture: string,
    sub: string
}
export type AuthValuesType = {
  user: TUser | null;
  setUser: (value: null) => void;
  setOpenLogin: (value: null) => void;
};
