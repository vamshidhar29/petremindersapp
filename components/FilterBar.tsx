import React from 'react';
import { IoSunnySharp } from "react-icons/io5";
import { GoArrowSwitch } from "react-icons/go";

const FilterBar = () => {
  return (
    <div className="flex justify-between items-center my-4">
      <div className="text-md font-semibold text-gray-700 flex flex-row items-center">
        <IoSunnySharp className='me-2' /> Afternoon
      </div>
      <div className="text-lg font-semibold text-gray-700"><GoArrowSwitch /></div>
    </div>
  );
};

export default FilterBar;