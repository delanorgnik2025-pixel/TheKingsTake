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

  const {
    data: adminSession,
    isLoading: adminSessionLoading,
  } = trpc.auth.adminSession.useQuery(undefined, {
    enabled: !!adminToken,
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
    if (adminToken && adminSession?.valid === false) {
      localStorage.removeItem("adminToken");
    }
  }, [adminToken, adminSession?.valid]);

  const isLoadingAuth = isLoading || (!!adminToken && adminSessionLoading);
  const hasValidAdminToken = !!adminToken && adminSession?.valid === true;

  useEffect(() => {
    if (redirectOnUnauthenticated && !isLoadingAuth && !user && !hasValidAdminToken) {
      const currentPath = window.location.pathname;
      if (currentPath !== redirectPath) {
        navigate(redirectPath);
      }
    }
  }, [redirectOnUnauthenticated, isLoadingAuth, user, hasValidAdminToken, navigate, redirectPath]);

  // A stored token is not proof of access; only a server-verified token is trusted.
  const isAdmin = user?.role === "admin" || hasValidAdminToken;
  const isAuthenticated = !!user || hasValidAdminToken;

  return useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated,
      isAdmin,
      isLoading: isLoadingAuth || logoutMutation.isPending,
      error,
      logout,
      refresh: refetch,
    }),
    [user, isAuthenticated, isAdmin, isLoadingAuth, logoutMutation.isPending, error, logout, refetch],
  );
}
