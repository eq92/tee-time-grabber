import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateSelector, { DateSelectorProps } from './DateSelector';

describe('DateSelector', () => {
  const dates = ['2024-05-10', '2024-05-11'];
  const onSelect = jest.fn();

  it('renders all date options', () => {
    render(<DateSelector dates={dates} onSelect={onSelect} />);
    dates.forEach(date => {
      expect(screen.getByText(date)).toBeInTheDocument();
    });
  });

  it('calls onSelect when a date is selected', () => {
    render(<DateSelector dates={dates} onSelect={onSelect} />);
    fireEvent.change(screen.getByLabelText(/select date/i), { target: { value: dates[1] } });
    expect(onSelect).toHaveBeenCalledWith(dates[1]);
  });
}); 