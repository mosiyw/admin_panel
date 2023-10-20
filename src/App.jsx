import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "react-auth-kit";
import Router from "./routes";
import ThemeProvider from "./theme";
import { StyledChart } from "./components/chart";
// import ScrollToTop from "./components/scroll-to-top";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider authName="token" authType="localstorage" cookieDomain={window.location.hostname} cookieSecure={false}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider>
            <Toaster />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
