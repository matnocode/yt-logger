import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/home/HomePage";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </div>
  );
};

export default App;
