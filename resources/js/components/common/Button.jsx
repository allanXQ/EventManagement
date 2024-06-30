import { Button, Typography, useTheme } from "@mui/material";

export const MuiButton = (props) => {
  const { variant, type, onClick, sx, content, disabled, href, children } =
    props;
  const theme = useTheme();
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      type={type}
      href={href}
      sx={{
        textTransform: "none",
        // width: 10,
        backgroundColor: "#993133",
        //hover
        "&:hover": {
          backgroundColor: "#993133",
        },
        ...sx,
      }}
    >
      {content && (
        <Typography
          variant="bodyRegularBold"
          color={
            variant === "text" || variant === "outlined"
              ? "theme.palette.blue.main"
              : theme.palette.white.main
          }
        >
          {content}
        </Typography>
      )}
      {children}
    </Button>
  );
};
