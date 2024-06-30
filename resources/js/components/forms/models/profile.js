import CreateForm from "../components/createForm";

const profileModel = {
  name: "Profile",
  endpoint: "auth/update-password",
  method: "post",
  button: "Update",
};

const ProfileForm = ({ children }) => {
  profileModel.fields = [
    {
      name: "oldPassword",
      type: "password",
      label: "Old Password",
      placeholder: "Enter old password",
      required: true,
    },
    {
      name: "newPassword",
      type: "password",
      label: "New Password",
      placeholder: "Enter new password",
      required: true,
    },
  ];
  return CreateForm(profileModel, children);
};

export default ProfileForm;
