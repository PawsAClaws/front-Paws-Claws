import axios from "axios";
import BASE_URL, { cookies } from "./api";




const token = cookies.get("token");




export const getUserId = async (id) => {

    try {


        const response = await axios.get(`${BASE_URL}/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.data);
        return response.data.data




    } catch (error) {
        console.log(error);
    }




}