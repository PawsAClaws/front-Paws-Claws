import axios from "axios";




const BASE_URL = "https://backend-online-courses.onrender.com/api/v1";



// Get All My Ads
export const fetchMyAds = async () => {

    const token = localStorage.getItem("token");


    try {

        const result = await axios.get(`${BASE_URL}/post/mine`, {

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(result.data);
        return result.data
    } catch (error) {
        console.log(error);
    }
}


// Delete My Ad
export const deleteMyAd = async (id) => {
    const token = localStorage.getItem("token");

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