import axios, { AxiosError } from 'axios';

export interface Slot {
  time: string;
  available: boolean;
}

/**
 * Fetch tee times from the API with retry and timeout logic.
 * @returns Promise<Record<string, Slot[]>>
 */
export async function fetchTeeTimes(): Promise<Record<string, Slot[]>> {
  const url = `${process.env.REACT_APP_API_URL}/tee_times.json`;
  const timeout = 5000;
  const maxRetries = 2;
  let attempt = 0;
  let lastError: unknown = null;

  while (attempt <= maxRetries) {
    try {
      const response = await axios.get<Record<string, Slot[]>>(url, { timeout });
      return response.data;
    } catch (error) {
      lastError = error;
      // Only retry on network errors (not 4xx/5xx)
      if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
        attempt++;
        if (attempt > maxRetries) break;
      } else {
        throw error;
      }
    }
  }
  throw lastError;
} 