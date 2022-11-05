import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

export const signIn = (formData) => API.post("/users/sign-in", formData);
export const signUp = (formData) => API.post("/users/sign-up", formData);
export const googleSignIn = (result) =>
  API.post("/users/google-sign-in", result);
