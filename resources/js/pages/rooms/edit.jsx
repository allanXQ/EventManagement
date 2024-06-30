import { Box, Typography } from "@mui/material";
import UpdateRoomModel from "../../components/forms/models/updateroom";
import React from "react";

const EditRoom = () => {
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
            <Typography variant="h4">Edit Room</Typography>
            <UpdateRoomModel />;
        </Box>
    );
};

export default EditRoom;
