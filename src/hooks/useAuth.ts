import { trpc } from "@/providers/trpc";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { LOGIN_PATH } from "@/const";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = LOGIN_PATH } =
    options ?? {};

  const navigate = useNavigate();
  const utils = trpc.useUtils();

  // Check for password-based admin token in localStorage
  const [adminToken, setAdminToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
  );

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      navigate(redirectPath);
    },
  });

  const logout = useCallback(() => {
    // Always clear localStorage admin token on logout
    localStorage.removeItem("adminToken");
    setAdminToken(null);
    logoutMutation.mutate();
  }, [logoutMutation]);

  useEffect(() => {
    if (redirectOnUnauthenticated && !isLoading && !user && !adminToken) {
      const currentPath = window.location.pathname;
      if (currentPath !== redirectPath) {
        navigate(redirectPath);
      }
    }
  }, [redirectOnUnauthenticated, isLoading, user, adminToken, navigate, redirectPath]);

  // Admin if: (1) OAuth user with admin role, OR (2) password admin token exists
  const isAdmin = user?.role === "admin" || !!adminToken;
  const isAuthenticated = !!user || !!adminToken;

  return useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated,
      isAdmin,
      isLoading: isLoading || logoutMutation.isPending,
      error,
      logout,
      refresh: refetch,
    }),
    [user, isAuthenticated, isAdmin, isLoading, logoutMutation.isPending, error, logout, refetch],
  );
}
