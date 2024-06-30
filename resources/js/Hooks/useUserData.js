import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/user/userSlice";

const useUserData = () => {
    const user = useSelector(selectUser);
    if (!user) return {};
    const { userId, firstname, lastname, email, bookings } = user;
    return {
        userId,
        firstname,
        lastname,
        email,
        bookings,
    };
};

export default useUserData;
