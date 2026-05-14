let isLoggedOut = false;

export function setLoggedOut(value: boolean) {
  isLoggedOut = value;
}

export function getIsLoggedOut() {
  return isLoggedOut;
}

export function resetAuthState() {
  isLoggedOut = false;
}
