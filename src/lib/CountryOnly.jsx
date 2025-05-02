import { useState } from "react";
import countries from "world-countries";
import React from 'react'


const CountryOnly = ({ onCountryChange }) => {
    const [selectedCountry, setSelectedCountry] = useState("");

    const handleChange = (e) => {
        const countryName = e.target.value;
        setSelectedCountry(countryName);
        if (onCountryChange) onCountryChange(countryName);
    };

    return (

        <div>
            <select
                className="w-full p-4 border rounded bg-white"
                onChange={handleChange}
                value={selectedCountry}
            >
                <option className="text-gray-500" value="">
                    Select a country
                </option>
                {countries.map((country, i) => (
                    <option key={i} value={country.name.common}>
                        {country.name.common}
                    </option>
                ))}
            </select>

        </div>

    );
};

export default CountryOnly;
