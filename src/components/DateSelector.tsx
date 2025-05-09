import React from 'react';

export interface DateSelectorProps {
  dates: string[];
  onSelect: (date: string) => void;
  value?: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({ dates, onSelect, value }) => (
  <label className="block text-sm font-medium text-gray-700" htmlFor="date-select">
    Select Date
    <select
      id="date-select"
      aria-label="Select date"
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      value={value}
      onChange={e => onSelect(e.target.value)}
    >
      <option value="" disabled>Select a date</option>
      {dates.map(date => (
        <option key={date} value={date}>{date}</option>
      ))}
    </select>
  </label>
);

export default DateSelector; 