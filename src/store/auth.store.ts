import { create } from "zustand";
import type { ResponseLoginUserType } from "../types/types";
import Cookies from "js-cookie";

interface AuthState {
  user: ResponseLoginUserType | null;
  token: string | null;
  setTokenData: (user: ResponseLoginUserType, token: string) => Promise<void>;
  removeTokenData: () => void;
}

export const useAtuhStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user")!) || null,
  token: Cookies.get("token") || null,

  setTokenData: async (user, token) => {
    Cookies.set("token", token, {
      expires: 7,
    });
    localStorage.setItem("user", JSON.stringify(user));
    set({
      token: token,
      user: user,
    });
  },
  removeTokenData: () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    set({
      token: null,
      user: null,
    });
  },
}));
