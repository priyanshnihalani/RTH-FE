import { useMemo } from "react";

const YearSelector = ({ value, onChange }) => {

  const years = useMemo(() => {
    const list = [];
    for (let i = value - 5; i <= value + 5; i++) {
      list.push(i);
    }
    return list;
  }, [value]);

  const handleChange = (e) => {
    const year = Number(e.target.value);
    onChange(year);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="cursor-pointer px-3 py-2 rounded-md focus:outline-none"
    >
      {years.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
  );
};

export default YearSelector;
