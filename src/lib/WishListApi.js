import axios from "axios";
import BASE_URL, { cookies } from "./api";


const token = cookies.get("token");


export const fetchWishList = async (id) => {


    try {

        const response = await axios.post(
            `${BASE_URL}/wishlist/${id}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    }
    catch (error) {
        console.log(error);
    }

}


