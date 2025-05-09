import React from 'react';
import { Slot } from '../services/teeTimeService';

export interface TeeTimeListProps {
  slots: Slot[];
  courseName?: string;
}

const TeeTimeList: React.FC<TeeTimeListProps> = ({ slots, courseName }) => (
  <section aria-label="Tee time slots" className="my-4">
    {courseName && <h2 className="text-lg font-semibold mb-2">{courseName}</h2>}
    {slots.length === 0 ? (
      <p className="text-gray-500" role="status">No slots</p>
    ) : (
      <ul className="divide-y divide-gray-200 bg-white rounded shadow">
        {slots.map((slot, idx) => (
          <li key={slot.time + idx} className="flex justify-between items-center px-4 py-2">
            <span className="font-mono">{slot.time}</span>
            <span className={slot.available ? "text-green-700 font-semibold" : "text-gray-400"}>
              {slot.available ? 'Available' : 'Unavailable'}
            </span>
          </li>
        ))}
      </ul>
    )}
  </section>
);

export default TeeTimeList; 