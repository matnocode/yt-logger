import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("e", event);
    navigate("/results/" + value);
  };

  return (
    <div>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Form.Group className="">
          <Form.Label>Enter playlist url</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://www.youtube.com/playlist?list=PLbpi6ZahtOH6H4JzrAfAN8lpjzEveLDqj"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchBar;
