import { City } from "country-state-city";
import { useState } from "react";
import React from 'react';
import countries from "world-countries";

const Location = ({ onCountryChange, onCityChange }) => {


    const [cities, setCities] = useState([]);
    const countries = Country.getAllCountries();

    const handleChange = (e) => {
        const countryName = e.target.value;
        console.log(countryName);

        const selectedCountry = countries.find(
            (country) => country.name.common === countryName
        );

        const countryCode = selectedCountry?.cca2;
        const cities = City.getCitiesOfCountry(countryCode) || [];
        setCities(cities);

        if (onCountryChange) onCountryChange(countryName);
    };


    const handleCityChange = (e) => {
        console.log(e.target.value);
        const city = e.target.value;
        if (onCityChange) onCityChange(city);
    };


    return (
        <div >


            <select
                className="w-full p-4 border rounded bg-white"
                onChange={handleChange}
                name="country"
                id="country"
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

            {cities.length > 0 && (
                <select
                    onChange={handleCityChange}
                    className="p-4 border rounded w-full mt-4 bg-white"
                >
                    <option className="text-gray-500" value="">
                        Select a city
                    </option>
                    {cities.map((city, i) => (
                        <option key={i} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default Location;
