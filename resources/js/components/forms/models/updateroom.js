import {
    selectRoom,
    selectRooms,
} from "../../../redux/features/rooms/roomsSlice";
import CreateForm from "../components/createForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const updateRoomModel = {
    name: "Update Room",
    endpoint: "rooms/update",
    method: "post",

    fields: [
        {
            name: "image",
            type: "file",
            label: "Image",
        },
        {
            name: "oldName",
            type: "text",
            label: "Old Name",
            disabled: true,
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

const UpdateRoomModel = ({ children }) => {
    const { name } = useParams();
    const rooms = useSelector(selectRooms);
    const room = rooms.find((room) => room.name === name);
    const equipment = room?.equipment?.map((item) => item.name || item);
    const initialFormValues = {
        oldName: room.name,
        name: room.name,
        location: room.location,
        capacity: room.capacity,
        equipment: equipment?.join(", "),
    };
    return CreateForm(updateRoomModel, children, initialFormValues);
};

export default UpdateRoomModel;
