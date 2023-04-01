import { useNavigate } from "react-router";

const HomePage: React.FC = () => {
  const nav = useNavigate();

  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
};

export default HomePage;
