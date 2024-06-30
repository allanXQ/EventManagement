import CreateForm from "../components/createForm";

const loginModel = {
  name: "Sign In",
  endpoint: "auth/login",
  method: "post",

  fields: [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
    },
  ],
};

const LoginForm = ({ isAdmin, children }) => {
  isAdmin && (loginModel.endpoint = "auth/admin/login");
  return CreateForm(loginModel, children);
};

export default LoginForm;
