import { Box, Typography } from "@mui/material";
import CreateRoomForm from "../../components/forms/models/createRoom";
import React from "react";

const CreateRoom = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
                padding: 2,
            }}
        >
            <Typography variant="h4">Create Room</Typography>
            <CreateRoomForm />
        </Box>
    );
};

export default CreateRoom;
