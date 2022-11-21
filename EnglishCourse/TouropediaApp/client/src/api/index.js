import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("profile").token
    )}`;
  }

  return req;
});

export const signIn = (formData) => API.post("/users/sign-in", formData);
export const signUp = (formData) => API.post("/users/sign-up", formData);
export const googleSignIn = (result) =>
  API.post("/users/google-sign-in", result);
export const addTour = (tourData) => API.post("/tours", tourData);
