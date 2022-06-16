// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

import theme from "@/styles/theme";
import Routes from "./routes";
import { AuthProvider } from "./contexts/Authentication";
import "@/locales/i18n";

export default function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </AuthProvider>
  );
}
