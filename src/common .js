import * as Yup from "yup";

export const router_link = {
  HOME: "/",
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  MESSAGES: "/messages",
  USER: "/user",
  PROFILE: "/profile",
};

export const validate = {
  TEXT: Yup.string()
    .required()
    .min(2, "Must be 2 characters or more")
    .max(80, "Must be 80 characters or less"),
  EMAIL: Yup.string().required().email("Invalid email address"),
  PASSWORD: Yup.string().required().min(8, "PassWord minimum 8 characters"),
};

export const firebase_collection = {
  USERS: "users",
  ROOMS: "rooms",
  MESSAGE: "message",
};

export const role_room = {
  USER: "user",
  ADMIN: "admin",
};

export const TOAST_TYPE = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};
