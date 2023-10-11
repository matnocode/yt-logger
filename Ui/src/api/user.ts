import { User } from "../model/user";
import { apiClient } from "./apiClient";

export const getUser = () =>
  apiClient.get("https://localhost:5001/user/getUser").json<User>();
