import axios from "axios";
import BASE_URL, { cookies } from "./api";


// Get All My Ads
export const fetchMyAds = async () => {

    const token = cookies.get("token");


    try {

        const result = await axios.get(`${BASE_URL}/post/mine`, {

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


// Delete My Ad
export const deleteMyAd = async (id) => {
    const token = cookies.get("token");

    try {

        const result = await axios.delete(`${BASE_URL}/post/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

        })

        return result.data

    } catch (error) {
        console.log(error);
    }


}