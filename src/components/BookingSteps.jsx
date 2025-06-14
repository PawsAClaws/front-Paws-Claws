import React from "react";
import { useState } from "react";
import { getYear, getMonth, format, set } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BASE_URL, { cookies } from "../lib/api";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";




export default function BookingSteps() {

    const range = (start, end, step = 1) => {
        let output = [];
        for (let i = start; i < end; i += step) {
            output.push(i);
        }
        return output;
    };

    const [step, setStep] = useState(1);
    const [customAnimalType, setCustomAnimalType] = useState("");
    const [animalType, setAnimalType] = useState("Dog");
    const [description, setDescription] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const doctorId = location.state?.doctorId;



    const formattedDate = format(startDate, "yyyy-MM-dd");





    const handleConfirm = async () => {

        const token = cookies.get("token");

        const data = {
            time: formattedDate,
            doctorId: doctorId,
            description,
            animal: animalType === "Other" ? customAnimalType : animalType,

        };

        try {

            const res = await axios.post(`${BASE_URL}/appointment`, data, {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },

            });


            toast.success("your appointment created successfully");
            navigate("/home");


        } catch (error) {
            console.error("Booking error:", error);
            toast.error(error.response.data.message);
            setErrMsg(error.response.data.message);
        }
    };






    return (

        <div className="bg-black/75 h-screen flex justify-center items-center">


            <div className="max-w-lg mx-auto space-y-8 ">


                {step === 1 && (

                    <>



                        <DatePicker
                            className="cursor-pointer text-3xl text-center"
                            renderCustomHeader={({
                                date,
                                changeYear,
                                changeMonth,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled,

                            }) => (
                                <div
                                    style={{
                                        margin: 10,
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "300px",
                                        height: "50px",

                                    }}
                                >
                                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                        {"<"}
                                    </button>
                                    <select
                                        value={getYear(date)}
                                        onChange={({ target: { value } }) => changeYear(value)}
                                    >
                                        {years.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={months[getMonth(date)]}
                                        onChange={({ target: { value } }) =>
                                            changeMonth(months.indexOf(value))
                                        }
                                    >
                                        {months.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>

                                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                        {">"}
                                    </button>
                                </div>
                            )}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                        <div className="flex flex-col gap-2.5">
                            <button
                                onClick={() => setStep(2)}
                                className="w-full bg-primary text-white p-3 rounded-xl hover:bg-primary/80 capitalize cursor-pointer"
                            >
                                next
                            </button>

                            <Link to="/home" className="capitalize p-3 text-center rounded-xl w-full bg-white border border-primary cursor-pointer"> cancel </Link>
                        </div>

                    </>

                )}

                {step === 2 && (

                    <div className="bg-white p-6 rounded-2xl shadow-lg  h-[400px] flex flex-col justify-between">


                        <label className="block text-lg font-medium mb-2 text-center">
                            Write A Short Description And Choose Your Animal
                        </label>

                        <textarea
                            maxLength={80}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write short description about your case"
                            className="w-full border border-primary rounded-lg p-3 mb-4 resize-none focus:outline-none"
                        />

                        <select
                            value={animalType}
                            onChange={(e) => setAnimalType(e.target.value)}
                            className="w-full border rounded-lg p-3 mb-4 focus:outline-none border-primary"
                        >
                            <option>Dog</option>
                            <option>Cat</option>
                            <option>Bird</option>
                            <option>Fish</option>
                            <option>Horse</option>
                            <option>Other</option>
                        </select>

                        {animalType === "Other" && (
                            <input
                                type="text"
                                placeholder="Please specify the animal type"
                                className="w-full border border-primary rounded-lg p-3 mb-4 focus:outline-none"
                                onChange={(e) => setCustomAnimalType(e.target.value)}
                            />
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep(1)}
                                className="bg-gray-300 text-black px-6 py-2 rounded-xl hover:bg-gray-400 w-full capitalize cursor-pointer"
                            >
                                back
                            </button>

                            <button
                                onClick={handleConfirm}
                                className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 w-full capitalize cursor-pointer"
                            >
                                done
                            </button>
                        </div>

                        {errMsg && <div className="text-red-500 text-2xl text-center">{errMsg}</div>}

                    </div>

                )}
            </div>
        </div>


    );
}







