
import axios from "axios";


const BASE_URL = "https://backend-online-courses.onrender.com/api/v1";
const token = localStorage.getItem("token");

// get post Details

export const fetchPostDetails = async (id) => {


    try {

        const result = await axios.get(`${BASE_URL}/post/${id}`, {

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return result.data


    } catch (error) {


        console.log(error);


    }


}