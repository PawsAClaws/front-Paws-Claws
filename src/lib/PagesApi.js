import axios from "axios";



const BASE_URL = "https://backend-online-courses.onrender.com/api/v1";

const token = localStorage.getItem("token");




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





export const fetchDeoctors = async () => {

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