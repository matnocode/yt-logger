import { useNavigate } from "react-router";
import SearchBar from "./components/SearchBar";

const HomePage: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="lg:tw-w-[75%] tw-m-auto">
      <h2 className="tw-text-4xl tw-text-center tw-m-5">Yt-Logger</h2>
      <SearchBar />
      <div className="tw-mt-[100px]">
        <p>Here will be our page desctrioption, faq section</p>
      </div>
    </div>
  );
};

export default HomePage;
