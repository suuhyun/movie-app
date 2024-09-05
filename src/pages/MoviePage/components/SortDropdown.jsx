import React from "react";

const SortDropdown = ({ options, setSortOption }) => {
  const handleChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="flex items-center gap-4 mb-4 md:justify-between">
      <div className="font-bold text-white text-nowrap">Sort by:</div>
      <select
        className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none"
        name="sort"
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
