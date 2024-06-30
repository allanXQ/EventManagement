import CreateForm from "../components/createForm";

const registerModel = {
  name: "Sign Up",
  endpoint: "auth/register",
  method: "post",

  fields: [
    {
      name: "firstname",
      type: "text",
      label: "Firstname",
      placeholder: "Enter your firstname",
      required: true,
    },
    {
      name: "lastname",
      type: "text",
      label: "Lastname",
      placeholder: "Enter your lastname",
      required: true,
    },
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
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      required: true,
    },
  ],
};

const RegisterForm = ({ isAdmin }) => {
  isAdmin && (registerModel.endpoint = "auth/admin/register");

  return CreateForm(registerModel);
};

export default RegisterForm;
