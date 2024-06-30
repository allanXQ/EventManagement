import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Modal,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MuiButton } from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRooms } from "../../redux/features/rooms/roomsSlice";
import { Config } from "../../utils/config";
import { selectUser } from "../../redux/features/user/userSlice";
import axios from "axios";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const navigate = useNavigate();
    const rooms = useSelector(selectRooms);
    const userData = useSelector(selectUser);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        height: 500,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <Box>
            <Typography variant="h3" align="center" gutterBottom>
                Meeting Rooms
            </Typography>
            <Grid container>
                <Grid
                    item
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                        flexWrap: "wrap",
                    }}
                >
                    {rooms.map((data) => (
                        <Card
                            key={data.id}
                            sx={{
                                width: 300,
                                minHeight: 400,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                p: 2,
                            }}
                        >
                            <CardHeader title={data.name} />
                            <img
                                src={`${Config.serverUrl}uploads/boardrooms/${data.image}`}
                                width={250}
                                height={150}
                                alt={data.name}
                            />
                            <CardContent
                                sx={{
                                    minHeight: 150,
                                }}
                            >
                                <Typography>
                                    Location: {data.location}
                                </Typography>
                                <Typography>
                                    Capacity: {data.capacity}
                                </Typography>
                            </CardContent>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                }}
                            >
                                <MuiButton
                                    variant="contained"
                                    content="View"
                                    onClick={() => {
                                        handleOpen();
                                        setModalData(data);
                                    }}
                                />

                                <MuiButton
                                    variant="contained"
                                    content="Book"
                                    onClick={() =>
                                        navigate(
                                            `/bookings/create/${data.name}`
                                        )
                                    }
                                />
                                {userData.role === "admin" && (
                                    <>
                                        <MuiButton
                                            variant="contained"
                                            content="Edit"
                                            onClick={() =>
                                                navigate(
                                                    `/rooms/edit/${data.name}`
                                                )
                                            }
                                        />
                                    </>
                                )}
                            </Box>
                        </Card>
                    ))}
                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography variant="h4">{modalData.name}</Typography>

                    <Grid
                        container
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            // alignItems: "center",

                            // gap: 5,
                        }}
                    >
                        <Grid item>
                            <img
                                src={`${Config.serverUrl}uploads/boardrooms/${modalData.image}`}
                                width={350}
                                height={250}
                                alt={modalData.name}
                            />
                            <Box>
                                <Typography>
                                    Location: {modalData.location}
                                </Typography>
                                <Typography>
                                    Capacity: {modalData.capacity}
                                </Typography>
                                <Typography>
                                    Status: {modalData.status}
                                </Typography>
                                {modalData.equipment && (
                                    <Box>
                                        <Typography>Equipment:</Typography>
                                        <Box>
                                            {modalData.equipment.map(
                                                (item, index) => (
                                                    <Typography
                                                        key={index}
                                                        sx={{
                                                            pl: 2,
                                                        }}
                                                    >
                                                        {item.name || item}
                                                    </Typography>
                                                )
                                            )}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                        <Grid item>
                            {modalData.bookings &&
                            modalData.bookings.length > 0 ? (
                                <Box>
                                    <Typography variant="h5">
                                        Bookings
                                    </Typography>
                                    <Box>
                                        {modalData.bookings?.map((booking) => (
                                            <Box
                                                sx={{
                                                    mb: 5,
                                                }}
                                            >
                                                <Typography>
                                                    Date:
                                                    {new Date(
                                                        booking.date
                                                    ).toLocaleDateString()}
                                                </Typography>
                                                <Typography>
                                                    Start Time:{" "}
                                                    {new Date(
                                                        booking.startTime
                                                    ).toLocaleTimeString()}
                                                </Typography>
                                                <Typography>
                                                    End Time:{" "}
                                                    {new Date(
                                                        booking.endTime
                                                    ).toLocaleTimeString()}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            ) : (
                                <Typography>
                                    <i>No Active Bookings</i>
                                </Typography>
                            )}

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                <MuiButton
                                    variant="contained"
                                    content="Book"
                                    onClick={() =>
                                        navigate(
                                            `/bookings/create/${modalData.name}`
                                        )
                                    }
                                />
                                {userData.role === "admin" && (
                                    <MuiButton
                                        variant="contained"
                                        content="Delete"
                                        onClick={() => {
                                            try {
                                                // withCredentials: true,

                                                axios.post(
                                                    `${Config.serverUrl}rooms/delete`,
                                                    {
                                                        name: modalData.name,
                                                    },
                                                    {
                                                        withCredentials: true,
                                                    }
                                                );
                                                handleClose();
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }}
                                    />
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
};

export default Dashboard;
