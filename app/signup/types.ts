export type SignupFormState = {
  email: string;
  message: string;
  status: "idle" | "success" | "error";
};
