import axios from "axios";
import BASE_URL, { cookies } from "./api";






export const fetchPages = async (type) => {

    const token = cookies.get("token");

    try {

        const response = await axios.get(`${BASE_URL}/post?type=${type}&page=1&limit=10&sortBy=DESC&`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;


    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }


}





export const fetchDeoctors = async () => {

    const token = cookies.get("token");

    try {

        const response = await axios.get(`${BASE_URL}/doctor`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;

    } catch (error) {
        console.error(error);

    }

}