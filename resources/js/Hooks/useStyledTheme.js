const { createTheme } = require("@mui/material");
const { useSelector } = require("react-redux");
const { selectTheme } = require("../redux/features/app");

const useStyledTheme = () => {
    const currentTheme = useSelector(selectTheme);
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
            },
        },
        palette: {
            blue: {
                dark: "#84420a",
                secondary: "#84420a",
                main: "#84420a",
            },
            bgColor: {
                light: "#ffffff",
                dark: "#16142a",
            },
            black: {
                main: "#424242",
                light: "#616161",
                dark: "#212121",
            },
            white: {
                main: "#ffffff",
                secondary: "#c0c0bd",
            },
            green: {
                main: "#00b341",
                secondary: "#00b341",
            },
            red: {
                main: "#ff0000",
                secondary: "#ff0000",
            },
        },

        typography: {
            h1: {
                fontSize: "2.488rem",
                fontWeight: 700,
            },
            h2: {
                fontSize: "2.074rem",
                fontWeight: 700,
            },
            h3: {
                fontSize: "1.728rem",
                fontWeight: 700,
            },
            h4: {
                fontSize: "1.44rem",
                fontWeight: 700,
            },
            h5: {
                fontSize: "1.2rem",
                fontWeight: 700,
            },
            h6: {
                fontSize: "1rem",
                fontWeight: 600,
            },
            bodyLarge: {
                fontSize: "1.2rem",
                fontWeight: 400,
            },
            bodyLargeBold: {
                fontSize: "1.2rem",
                fontWeight: 700,
            },
            bodyRegular: {
                fontSize: "1rem",
                fontWeight: 400,
            },
            bodyRegularBold: {
                fontSize: "1rem",
                fontWeight: 700,
            },
            bodySmall: {
                fontSize: "0.833rem",
                fontWeight: 400,
            },
            bodySmallBold: {
                fontSize: "0.833rem",
                fontWeight: 600,
            },
        },

        components: {
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        "&&": {
                            color: "#844543",
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        "& fieldset": {
                            border: "0.5px solid #844543 !important",
                        },
                        "&:hover fieldset": {
                            border: "0.5px solid #844543 !important",
                        },
                        "&.Mui-focused fieldset": {
                            border: "0.5px solid #844543 !important",
                        },
                    },
                },
            },
        },
    });

    theme.components.MuiCssBaseline = {
        styleOverrides: {
            body: {
                backgroundColor:
                    currentTheme === "light"
                        ? theme.palette.bgColor.light
                        : theme.palette.bgColor.dark,
            },
            //may update later
            "::-webkit-scrollbar": {
                width: "0em",
                height: "0em",
            },
            "::-webkit-scrollbar-track": {
                backgroundColor:
                    currentTheme === "light"
                        ? theme.palette.bgColor.light
                        : theme.palette.bgColor.dark,
            },
            "::-webkit-scrollbar-thumb": {
                backgroundColor:
                    currentTheme === "light"
                        ? theme.palette.white.secondary
                        : theme.palette.blue.main,
                borderRadius: "2rem",
            },

            "& .MuiToolbar-root": {
                backgroundColor:
                    currentTheme === "light"
                        ? theme.palette.bgColor.light
                        : theme.palette.bgColor.dark,
            },

            "& .MuiList-root": {
                backgroundColor:
                    currentTheme === "light"
                        ? theme.palette.bgColor.light
                        : theme.palette.bgColor.dark,
            },

            "& .MuiTypography-root": {
                color:
                    currentTheme === "light"
                        ? theme.palette.black.main
                        : theme.palette.white.main,
            },

            "& .MuiSvgIcon-root": {
                color:
                    currentTheme === "dark"
                        ? theme.palette.bgColor.light
                        : theme.palette.bgColor.dark,
            },

            "& .MuiSelect-iconOutlined": {
                color:
                    currentTheme === "dark"
                        ? theme.palette.bgColor.light
                        : theme.palette.bgColor.dark,
            },

            "& .MuiInputBase-root": {
                "& .MuiInputBase-input": {
                    color:
                        currentTheme === "light"
                            ? theme.palette.bgColor.dark
                            : theme.palette.bgColor.light,
                    // border: "1px solid #844543"
                    boxShadow: "none",
                },

                "& .MuiSvgIcon-root": {
                    color:
                        currentTheme === "dark"
                            ? theme.palette.bgColor.light
                            : theme.palette.bgColor.dark,
                },
            },

            "& .MuiPaper-root": {
                backgroundColor:
                    currentTheme === "light"
                        ? theme.palette.bgColor.light
                        : theme.palette.bgColor.dark,
            },
            "& .MuiDrawer-root ": {
                "& .MuiDrawer-paper": {
                    backgroundColor:
                        currentTheme === "light"
                            ? theme.palette.bgColor.light
                            : theme.palette.bgColor.dark,
                },
            },
        },
    };

    return theme;
};

export default useStyledTheme;
