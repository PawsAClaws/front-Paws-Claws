
import axios from "axios";
import BASE_URL, { cookies } from "./api";



// get post Details

export const fetchPostDetails = async (id) => {

    const token = cookies.get("token");

    try {

        const result = await axios.get(`${BASE_URL}/post/${id}`, {

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return result?.data


    } catch (error) {


        console.log(error);


    }


}