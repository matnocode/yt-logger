import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";

import Container from "./common/Container";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ResultPage from "./pages/result/ResultPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Container />}>
            <Route index element={<HomePage />} />
            <Route path="/results/:playlistId" element={<ResultPage />} />
          </Route>
          <Route path="*" element={<Container />}>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <Toaster />
      </QueryClientProvider>
    </>
  );
};

export default App;
