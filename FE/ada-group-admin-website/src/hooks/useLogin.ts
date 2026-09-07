import { useMutation } from "@tanstack/react-query";
import { login, type LoginRequest, type LoginResponse } from "@/src/lib/api/auth";
import { setAccessToken, setRefreshToken } from "@/src/lib/storage";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },
  });
}
