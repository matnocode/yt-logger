import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { CusError } from "../../../model/error";

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState<CusError | undefined>(undefined);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateSearch()) return;
    console.log("e", event);
    navigate("/results/" + getId());
  };

  useEffect(() => {
    if (errors) setErrors(undefined);
  }, [value]);

  const getId = () => {
    return value.substring(value.indexOf("=") + 1);
  };

  const validateSearch = () => {
    if (!value || !value?.includes("https://www.youtube.com/playlist?list=")) {
      setErrors({
        label:
          "link must be: https://www.youtube.com/playlist?list=[your playlist id]",
      });
      return true;
    }
    return false;
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
          {errors && <div className="tw-text-red-600">{errors.label}</div>}
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchBar;
