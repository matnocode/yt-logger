import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import Container from "./common/Container";
import ResultPage from "./pages/result/ResultPage";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Container />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/results/:playlistId" element={<ResultPage />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
