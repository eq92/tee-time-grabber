import React from 'react';
import { render, screen } from '@testing-library/react';
import TeeTimeList from './TeeTimeList';
import { Slot } from '../services/teeTimeService';

describe('TeeTimeList', () => {
  const slots: Slot[] = [
    { time: '08:00', available: true },
    { time: '09:00', available: false },
  ];

  it('renders course name if provided', () => {
    render(<TeeTimeList slots={slots} courseName="Pebble Beach" />);
    expect(screen.getByText('Pebble Beach')).toBeInTheDocument();
  });

  it('renders all slots', () => {
    render(<TeeTimeList slots={slots} />);
    slots.forEach(slot => {
      expect(screen.getByText(slot.time)).toBeInTheDocument();
      // Check for 'Available' or 'Unavailable' text
      expect(
        screen.getByText(slot.available ? 'Available' : 'Unavailable')
      ).toBeInTheDocument();
    });
  });

  it('shows "No slots" if empty', () => {
    render(<TeeTimeList slots={[]} />);
    expect(screen.getByText(/no slots/i)).toBeInTheDocument();
  });
}); 