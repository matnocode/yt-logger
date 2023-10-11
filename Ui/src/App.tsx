import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";

import Container from "./common/Container";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ResultPage from "./pages/result/ResultPage";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./auth/UserContext";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Container />}>
              <Route index element={<HomePage />} />
              <Route path="/results/:playlistId" element={<ResultPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<Container />}>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <Toaster />
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
