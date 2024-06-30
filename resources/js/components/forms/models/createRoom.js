import CreateForm from "../components/createForm";

const createRoomModel = {
  name: "Create Room",
  endpoint: "rooms/create",
  method: "post",

  fields: [
    {
      name: "image",
      type: "file",
      label: "Image",
      required: true,
    },
    {
      name: "name",
      type: "text",
      label: "Room Name",
      placeholder: "Enter room's name",
      valueParam: "roomName",
      required: true,
    },
    {
      name: "location",
      type: "text",
      label: "Location",
      placeholder: "Enter location",
      required: true,
    },
    {
      name: "capacity",
      type: "number",
      label: "Capacity",
      placeholder: "Enter capacity",
      required: true,
    },
    {
      name: "equipment",
      type: "text",
      label: "Equipment",
      required: true,
    },
  ],
};

const CreateRoomForm = ({ children }) => {
  const initialFormValues = {
    image: null,
    name: "",
    location: "",
    capacity: "",
    equipment: "",
  };
  return CreateForm(createRoomModel, children, initialFormValues);
};

export default CreateRoomForm;
