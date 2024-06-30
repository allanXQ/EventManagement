import RegisterForm from "../../components/forms/models/register";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    selectIsLoggedIn,
    selectIsRegistered,
} from "../../redux/features/user/userSlice";
import Auth from "./auth";

const Register = ({ isAdmin }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            return navigate("/dashboard");
        }
    }, [isLoggedIn, navigate]);
    const sublink = {
        text: "Already have an account? ",
        pathname: "/login",
        sublinkText: "Log in",
    };
    return (
        <Auth
            title="Sign Up"
            sublink={sublink}
            sx={{
                mb: 10,
            }}
        >
            <RegisterForm isAdmin={isAdmin} />
        </Auth>
    );
};

export default Register;
