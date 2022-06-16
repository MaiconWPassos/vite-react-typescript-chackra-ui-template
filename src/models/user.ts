export function createSession(email: string, password: string) {
  return {
    status: 200,
    data: {
      email: email,
      name: "John Doe",
      token: email,
    },
  };
}

export function myInformation() {
  return {
    status: 200,
    data: {
      email: localStorage.getItem(import.meta.env.VITE_APP_AUTH_MD5_KEY) || "",
      name: "John Doe",
    },
  };
}
