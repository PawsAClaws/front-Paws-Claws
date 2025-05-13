
import axios from "axios";
import BASE_URL, { cookies } from "./api";

const token = cookies.get("token");


// get All categories

export const fetchCategories = async () => {

    try {
        const response = await axios.get(`${BASE_URL}/category`, {
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


// get category by id

export const fetchCategoryById = async (id) => {

    try {
        const response = await axios.get(`${BASE_URL}/category/${id}`, {

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        return response.data.data


    } catch (error) {
        console.log(error);

    }


}

