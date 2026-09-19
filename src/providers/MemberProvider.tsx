import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { trpc } from "@/providers/trpc";

interface Member {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  facebookSubscribed: boolean;
}

interface MemberContextType {
  member: Member | null;
  isLoading: boolean;
  login: (token: string, member: Member) => void;
  logout: () => void;
  token: string | null;
}

const MemberContext = createContext<MemberContextType | null>(null);

export function MemberProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("memberToken")
  );
  const [isLoading, setIsLoading] = useState(true);

  const meQuery = trpc.member.me.useQuery(undefined, {
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (meQuery.data) {
      setMember(meQuery.data);
    } else if (meQuery.isError) {
      localStorage.removeItem("memberToken");
      setToken(null);
      setMember(null);
    }
    setIsLoading(false);
  }, [meQuery.data, meQuery.isError]);

  const login = useCallback((newToken: string, newMember: Member) => {
    localStorage.setItem("memberToken", newToken);
    setToken(newToken);
    setMember(newMember);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("memberToken");
    setToken(null);
    setMember(null);
  }, []);

  return (
    <MemberContext.Provider value={{ member, isLoading, login, logout, token }}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  const ctx = useContext(MemberContext);
  if (!ctx) throw new Error("useMember must be used inside MemberProvider");
  return ctx;
}
