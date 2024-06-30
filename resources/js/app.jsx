import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./components/Layouts/RootLayout";
import HomeLayout from "./components/Layouts/HomeLayout";
import Login from "./pages/Auth/login";
import Logout from "./pages/Auth/logout";
import Register from "./pages/Auth/register";
import MessageModal from "./components/messages";
import { ThemeProvider } from "@mui/material";
import useStyledTheme from "./Hooks/useStyledTheme";
import CreateBooking from "./pages/Bookings/create";
import CreateRoom from "./pages/rooms/create";
import EditRoom from "./pages/rooms/edit";

function App() {
    const theme = useStyledTheme();
    return (
        <ThemeProvider theme={theme}>
            <MessageModal />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route element={<HomeLayout />}>
                    <Route path="admin">
                        <Route path="login" element={<Login />} />
                        <Route
                            path="register"
                            element={<Register isAdmin={true} />}
                        />
                    </Route>
                </Route>

                <Route path="logout" element={<Logout />} />
                <Route element={<RootLayout />}>
                    <Route path="bookings">
                        <Route
                            path="create/:roomName"
                            element={<CreateBooking />}
                        />
                    </Route>
                    <Route path="rooms">
                        <Route path="create" element={<CreateRoom />} />
                        <Route path="edit/:name" element={<EditRoom />} />
                    </Route>
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
