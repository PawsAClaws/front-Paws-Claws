
import axios from "axios";
import BASE_URL, { cookies } from "./api";



const token = cookies.get("token");



export const fetchgetreview = async (id) => {

    try {

        const response = await axios.get(`${BASE_URL}/review/doctor/${id}`, {
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



export const fetchAddReview = async (id, comment, rating) => {

    try {

        const response = await axios.post(`${BASE_URL}/review/doctor/${id}`,
            {
                comment,
                rating,
            },
            {
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