import axios from "axios";
import BASE_URL, { cookies } from "./api";

const token = cookies.get("token");




export const fetchPages = async (type) => {

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