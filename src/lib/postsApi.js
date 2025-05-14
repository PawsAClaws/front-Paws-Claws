
import axios from "axios";
import BASE_URL, { cookies } from "./api";

const token = cookies.get("token");

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