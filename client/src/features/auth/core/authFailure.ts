import { queryClient } from "../../../api/queryClient";
import { removeToken } from "../api/auth.token";
import { setLoggedOut } from "./authState";

let isHandlingAuthFailure = false;

export function handleAuthFailure() {
  console.log("handle auth failure hit...");

  if (isHandlingAuthFailure) return;

  isHandlingAuthFailure = true;

  console.log("Auth Failure -> clearing serssion");

  setLoggedOut(true);

  removeToken();

  // queryClient.removeQueries({ queryKey: ["me"] });
  queryClient.clear();

  setTimeout(() => {
    isHandlingAuthFailure = false;
  }, 1000);
}
