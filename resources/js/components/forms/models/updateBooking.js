import CreateForm from "../components/createForm";

const updateBookingModel = {
  name: "Update Booking",
  endpoint: "bookings/update",
  method: "post",

  fields: [
    {
      name: "bookingId",
      type: "hidden",
      label: "Booking ID",
      disabled: true,
    },
    {
      name: "roomName",
      type: "text",
      label: "Room Name",
      placeholder: "Enter your room name",
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

const convertDateToISO = (dateString) => {
  // Check if dateString is already in ISO format (yyyy-MM-dd)
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (isoDatePattern.test(dateString)) {
    return dateString; // Return as is, no conversion needed
  }

  const parts = dateString.split("/");
  if (parts.length !== 3) {
    console.error(
      `convertDateToISO: dateString format is incorrect (${dateString})`
    );
    return ""; // Or return a default date string or handle the error appropriately
  }

  const [month, day, year] = parts;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const convertTimeTo24Hour = (timeString) => {
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes, seconds] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12; // Convert to 24-hour format
  }

  // Ensure hours is a string before using .padStart
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.padStart(2, "0");
  if (seconds) {
    seconds = seconds.padStart(2, "0");
  } else {
    seconds = "00"; // Ensure seconds are included
  }

  return `${hours}:${minutes}:${seconds}`;
};

const UpdateBookingForm = (props) => {
  const { children, initialFormValues } = props;
  initialFormValues.date = convertDateToISO(initialFormValues.date);
  initialFormValues.startTime = convertTimeTo24Hour(
    initialFormValues.startTime
  );
  initialFormValues.endTime = convertTimeTo24Hour(initialFormValues.endTime);
  return CreateForm(updateBookingModel, children, initialFormValues);
};

export default UpdateBookingForm;
