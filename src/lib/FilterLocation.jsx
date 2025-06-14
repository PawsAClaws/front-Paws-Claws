import React, { useEffect, useState } from "react";
import { Country, City } from "country-state-city";

const FilterLocation = ({ onCountryChange, onCityChange }) => {
    const [selectedCountryCode, setSelectedCountryCode] = useState("");
    const [selectedCountryName, setSelectedCountryName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);



    const countries = Country.getAllCountries();

    const handleCountryChange = (e) => {
        const isoCode = e.target.value;
        const country = countries.find(c => c.isoCode === isoCode);

        setSelectedCountryCode(isoCode);
        setSelectedCountryName(country?.name || "");
        setSelectedCity("");

        const newCities = City.getCitiesOfCountry(isoCode);
        setCities(newCities);

        if (onCountryChange) onCountryChange(country?.name || "");
    };

    const handleCityChange = (e) => {
        const cityName = e.target.value;
        setSelectedCity(cityName);
        if (onCityChange) onCityChange(cityName);
    };

    return (
        <div className="flex flex-col gap-4 md:flex-row">

            <select
                className="w-full p-3 border rounded bg-white"
                onChange={handleCountryChange}
                value={selectedCountryCode}
            >
                <option value="">Select a country</option>
                {countries.map((country, i) => (
                    <option key={i} value={country.isoCode}>
                        {country.name}
                    </option>
                ))}
            </select>


            <select
                className="w-full p-3 border rounded bg-white"
                onChange={handleCityChange}
                value={selectedCity}
                disabled={!selectedCountryCode}
            >
                <option value="">Select a city</option>
                {cities.map((city, i) => (
                    <option key={i} value={city.name}>
                        {city.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterLocation;
