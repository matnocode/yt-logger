import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const HomePage: React.FC = () => {
  const { isLoading, error, data } = useQuery("myData", () =>
    fetch("https://localhost:5001/temp/getResponse").then((res) => res.json())
  );

  return (
    <div>
      <h2>Home Page</h2>
      <h4>Returned data:</h4>
      {data && <p>data: {data.name}</p>}
    </div>
  );
};

export default HomePage;
