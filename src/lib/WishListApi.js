import axios from "axios";




const BASE_URL = "https://backend-online-courses.onrender.com/api/v1";


const token = localStorage.getItem("token");


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


export const myWishlists = async () => {

    try {

        const res = await axios.get("https://backend-online-courses.onrender.com/api/v1/wishlist", {

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });


        return res.data;


    } catch (error) {
        console.log(error);
    }


}