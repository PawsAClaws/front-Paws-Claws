import axios from "axios";
import BASE_URL, { cookies } from "./api";

export const fetchMyDoc = async () => {
    const token = cookies.get("token");

    try {
        const response = await axios.get(`${BASE_URL}/doctor/mine`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });



        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};