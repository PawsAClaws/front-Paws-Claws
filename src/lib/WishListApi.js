import axios from "axios";
import BASE_URL, { cookies } from "./api";





export const fetchWishList = async (id) => {

    const token = cookies.get("token");


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


