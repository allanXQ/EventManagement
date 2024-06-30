import BookingForm from "../../components/forms/models/book";
import { Box, Typography } from "@mui/material";

const CreateBooking = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                mt: 5,
            }}
        >
            <Typography variant="h3" align="center" gutterBottom>
                Book a Meeting Room
            </Typography>
            <BookingForm />;
        </Box>
    );
};

export default CreateBooking;
