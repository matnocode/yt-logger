import { apiClient } from "./apiClient";
import axios from "axios";

export const login = (email: string, password: string) =>
  apiClient.get("/auth/login", { params: { email, password } });

export const register = (email: string, password: string) =>
  apiClient.get("/auth/register", { params: { email, password } });
