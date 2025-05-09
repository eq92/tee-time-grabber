import axios from 'axios';
import { fetchTeeTimes, Slot } from './teeTimeService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchTeeTimes', () => {
  const mockData: Record<string, Slot[]> = {
    'Pebble Beach': [
      { time: '08:00', available: true },
      { time: '09:00', available: false },
    ],
  };

  it('returns tee times on success', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });
    const data = await fetchTeeTimes();
    expect(data).toEqual(mockData);
  });

  it('retries on timeout and eventually throws', async () => {
    mockedAxios.get.mockRejectedValue({ code: 'ECONNABORTED' });
    await expect(fetchTeeTimes()).rejects.toBeDefined();
    expect(mockedAxios.get).toHaveBeenCalledTimes(3); // 1 initial + 2 retries
  });

  it('throws immediately on non-network error', async () => {
    mockedAxios.get.mockRejectedValue({ code: 'ERR_BAD_REQUEST' });
    await expect(fetchTeeTimes()).rejects.toBeDefined();
  });
}); 