import CreateForm from "../components/createForm";
import { useParams } from "react-router-dom";

const bookingModel = {
  name: "Create Booking",
  endpoint: "bookings/create",
  method: "post",

  fields: [
    {
      name: "roomName",
      type: "text",
      label: "Room Name",
      placeholder: "Enter your room name",
      valueParam: "roomName",
      disabled: true,
    },
    {
      name: "date",
      type: "date",
      label: "Date",
      placeholder: "Enter your date",
      required: true,
    },
    {
      name: "startTime",
      type: "time",
      label: "Start Time",
      required: true,
    },
    {
      name: "endTime",
      type: "time",
      label: "End Time",
      required: true,
    },
    {
      name: "participants",
      type: "text",
      label: "Participants",
      placeholder: "Participants email addresses separated by comma",
      required: true,
    },
    {
      name: "zoomLink",
      type: "text",
      label: "Zoom Link",
      placeholder: "Meeting Zoom Link",
    },
  ],
};

const BookingForm = ({ children }) => {
  const { roomName } = useParams();
  const initialFormValues = {
    roomName,
  };
  return CreateForm(bookingModel, children, initialFormValues);
};

export default BookingForm;
