import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import Container from "./common/Container";
import ResultPage from "./pages/result/ResultPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <div>
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
      </QueryClientProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
