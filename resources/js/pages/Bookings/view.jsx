import { Box, Grid, Modal, Typography } from "@mui/material";
import useUserData from "../../Hooks/useUserData";
import { MuiButton } from "../../components/common/Button";
import MUIDataGrid from ".././components/common/Datagrid";
import UpdateBookingForm from "../../components/forms/models/updateBooking";
import React, { useMemo, useState } from "react";
import axios from "axios";
import { Config } from "../../utils/config";

const deleteBooking = async (bookingId) => {
    try {
        await axios.post(`${Config.serverUrl}bookings/delete`, {
            bookingId,
        });
    } catch (error) {
        console.error(error);
    }
};

const ViewBookings = () => {
    const userData = useUserData();
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800,
        height: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const columns = useMemo(
        () => [
            { field: "id", headerName: "ID", width: 200 },
            { field: "Room", headerName: "Room", width: 150 },
            { field: "Date", headerName: "Date", width: 150 },
            { field: "StartTime", headerName: "Start Time", width: 150 },
            { field: "EndTime", headerName: "End Time", width: 150 },
            { field: "Status", headerName: "Status", width: 150 },
            {
                field: "View",
                headerName: "View",
                width: 100,
                renderCell: (params) => (
                    <MuiButton
                        variant="contained"
                        content="View"
                        onClick={() => {
                            setModalData({
                                id: params.row.id,
                                Room: params.row.Room,
                                Date: params.row.Date,
                                StartTime: params.row.StartTime,
                                EndTime: params.row.EndTime,
                                Status: params.row.Status,
                                zoomLink: userData.bookings.find(
                                    (booking) => booking._id === params.row.id
                                ).zoomLink,
                                participants: userData.bookings.find(
                                    (booking) => booking._id === params.row.id
                                ).participants,
                            });
                            handleOpen();
                        }}
                    />
                ),
            },
            {
                field: "Delete",
                headerName: "Delete",
                width: 100,
                renderCell: (params) => (
                    <MuiButton
                        variant="contained"
                        color="secondary"
                        content="Delete"
                        onClick={() => {
                            deleteBooking(params.row.id);
                        }}
                    />
                ),
            },
        ],
        [userData.bookings]
    );
    const rows =
        Array.isArray(userData?.bookings) &&
        userData.bookings.map((booking) => {
            return {
                id: booking._id,
                Room: booking.roomName,
                Date: new Date(booking.date).toLocaleDateString(),
                StartTime: new Date(booking.startTime).toLocaleTimeString(),
                EndTime: new Date(booking.endTime).toLocaleTimeString(),
                Status: booking.status,
            };
        });
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
            }}
        >
            <Typography variant="h6">View Bookings</Typography>
            <MUIDataGrid rows={rows} columns={columns} />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box sx={modalStyle}>
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            // alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Grid
                            item
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                // justifyContent: "space-between",
                                // alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Typography variant="h5">
                                Booking Details
                            </Typography>
                            <Typography>Room: {modalData.Room}</Typography>
                            <Typography>Date: {modalData.Date}</Typography>
                            <Typography>
                                Start Time: {modalData.StartTime}
                            </Typography>
                            <Typography>
                                End Time: {modalData.EndTime}
                            </Typography>
                            <Typography>Status: {modalData.Status}</Typography>
                            <Typography>
                                Zoom Link: {modalData.zoomLink}
                            </Typography>
                            {
                                <Box>
                                    <Typography>Participants:</Typography>
                                    <Box>
                                        {modalData.participants?.map(
                                            (item, index) => (
                                                <Typography
                                                    key={index}
                                                    sx={{
                                                        pl: 2,
                                                    }}
                                                >
                                                    {item}
                                                </Typography>
                                            )
                                        )}
                                    </Box>
                                </Box>
                            }
                        </Grid>
                        <Grid
                            item
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <Typography variant="h5">Update Booking</Typography>
                            <UpdateBookingForm
                                initialFormValues={{
                                    bookingId: modalData.id,
                                    roomName: modalData.Room,
                                    date: modalData.Date,
                                    startTime: modalData.StartTime,
                                    endTime: modalData.EndTime,
                                    participants:
                                        modalData.participants?.join(","),
                                    zoomLink: modalData.zoomLink,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
};

export default ViewBookings;
