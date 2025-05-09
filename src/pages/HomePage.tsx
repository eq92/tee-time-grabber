import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import DateSelector from '../components/DateSelector';
import TeeTimeList from '../components/TeeTimeList';
import { fetchTeeTimes, Slot } from '../services/teeTimeService';

const demoDates = ['2024-05-10', '2024-05-11', '2024-05-12'];

const HomePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [teeTimes, setTeeTimes] = useState<Record<string, Slot[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTeeTimes()
      .then((data) => setTeeTimes(data))
      .catch((err) => setError(err.message || 'Error fetching tee times'))
      .finally(() => setLoading(false));
  }, []);

  // Collect all available dates from the fetched tee times
  const availableDates = Object.keys(teeTimes).length > 0 ? Object.keys(teeTimes) : demoDates;

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Tee Time Grabber</h1>
        <DateSelector dates={availableDates} value={selectedDate} onSelect={setSelectedDate} />
        {loading && <div>Loading tee times...</div>}
        {error && <div className="text-red-600">Error: {error}</div>}
        {!loading && !error && selectedDate && (
          <TeeTimeList slots={teeTimes[selectedDate] || []} courseName={selectedDate} />
        )}
      </div>
    </Layout>
  );
};

export default HomePage; 