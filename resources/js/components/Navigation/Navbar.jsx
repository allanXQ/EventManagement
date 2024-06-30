import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MuiButton } from "../../components/common/Button";
import { selectUser } from "../../redux/features/user/userSlice";

const drawerWidth = 0;

function ResponsiveDrawer(props) {
    const { isHome } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector(selectUser);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navLinks = [
        {
            name: "Dashboard",
            path: "/dashboard",
        },
        {
            name: "Profile",
            path: "/Profile",
        },
        {
            name: "Bookings",
            path: "/bookings/view",
        },
    ];

    const homeLinks = [
        {
            name: "Home",
            path: "/home",
        },
        {
            name: "About Us",
            href: "#about",
        },
        {
            name: "Contact Us",
            href: "#contact",
        },
    ];

    const topBarLinks = isHome ? homeLinks : navLinks;

    return (
        <Box
            sx={{
                display: "grid",
            }}
        >
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: isHome
                        ? "100vw"
                        : { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: isHome ? 0 : { sm: `${drawerWidth}px` },
                    boxShadow: "none",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                // justifyContent: "center",
                                // alignItems: "center",
                            }}
                        >
                            <img
                                src="kabarak.png"
                                alt="kabarak logo"
                                width={50}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            {topBarLinks.map((item, index) =>
                                item.href ? (
                                    <Typography
                                        key={index}
                                        variant="bodyRegularBold"
                                        component="a"
                                        href={item.href}
                                        sx={{
                                            color: "white",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                ) : (
                                    <Typography
                                        key={index}
                                        variant="bodyRegularBold"
                                        component={Link}
                                        to={item.path}
                                        sx={{
                                            color: "white",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                )
                            )}
                            {userData &&
                                userData.role === "admin" &&
                                !isHome && (
                                    <Typography
                                        variant="bodyRegularBold"
                                        component={Link}
                                        to="/rooms/create"
                                        sx={{
                                            color: "white",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Create Room
                                    </Typography>
                                )}
                        </Box>

                        {isHome ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                <MuiButton
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </MuiButton>
                                <MuiButton
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => navigate("/register")}
                                >
                                    Register
                                </MuiButton>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                <MuiButton
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate("/logout")}
                                >
                                    Logout
                                </MuiButton>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            {isHome ? (
                <Box
                    component="main"
                    sx={{
                        overflowX: "hidden",
                        display: "grid",
                        width: "100vw",
                        gap: 2,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {props.children}
                </Box>
            ) : (
                <Box
                    component="main"
                    sx={{
                        overflowX: "hidden",
                        display: "grid",
                        width: "100vw",
                        gap: 2,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Toolbar sx={{}} />
                    <Box
                        sx={{
                            px: { xs: 2, sm: 0 },
                        }}
                    >
                        {props.children}
                    </Box>
                </Box>
            )}
        </Box>
    );
}
export default ResponsiveDrawer;
