import axios from "axios";
import BASE_URL, { cookies } from "./api";









export const getUserId = async (id) => {

    const token = cookies.get("token");

    try {


        const response = await axios.get(`${BASE_URL}/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data




    } catch (error) {
        console.log(error);
    }




}