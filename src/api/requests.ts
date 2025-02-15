// axios
import axios from "axios";

// client
import { axiosInstance } from "@/api/http_client";

/**
 * Makes an HTTP request using axiosInstance with the specified method, endpoint, and options.
 *
 * @param {string} method - The HTTP method (GET, POST, PATCH, DELETE, etc.).
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {T} [data] - The request body data (for POST, PATCH, etc.).
 * @param {Record<string, unknown>} [params] - Query parameters to include in the request (for GET, etc.).
 * @returns {Promise<R>} A promise that resolves to the server response data.
 * @throws Will throw an error if the request fails.
 */
export async function makeRequest<T = unknown, R = unknown>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  endpoint: string,
  data?: T,
  params?: Record<string, unknown>
): Promise<R> {
  try {
    const isFormData = data instanceof FormData;
    const response = await axiosInstance.request<R>({
      method,
      url: endpoint,
      data,
      params,
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "An API error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

/**
 * Fetches records from the specified API endpoint with optional pagination,
 * sorting, and filtering parameters.
 *
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {number} [page] - The page number for pagination.
 * @param {number} [size] - The number of records to return per page.
 * @param {Record<string, any>} [filters] - Filters to apply to the records.
 * @param {string} [sortBy] - The field to sort the records by.
 * @param {string} [sortOptions] - The order to sort the records in.
 * @param {string} [startDate] - Start date for filtering records by date range.
 * @param {string} [endDate] - End date for filtering records by date range.
 * @returns {Promise<R>} A promise that resolves to the fetched records.
 * @throws Will throw an error if the request fails.
 */
export async function getRecords<R>(
  endpoint: string,
  page?: number,
  size?: number,
  filters?: Record<string, unknown>,
  sortBy?: string,
  sortOptions?: string,
  startDate?: string,
  endDate?: string
): Promise<R> {
  const params = {
    page,
    size,
    sortBy,
    sortOptions,
    startDate,
    endDate,
    ...filters,
  };
  return makeRequest<undefined, R>("GET", endpoint, undefined, params);
}

/**
 * Sends a POST request to create a new record at the specified API endpoint.
 *
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {T} data - The data to be included in the request body.
 * @returns {Promise<R>} A promise that resolves to the server response data.
 * @throws Will throw an error if the request fails.
 */
export async function createRecord<T, R>(endpoint: string, data: T): Promise<R> {
  return makeRequest<T, R>("POST", endpoint, data);
}

/**
 * Sends a PATCH request to update a record at the specified API endpoint.
 *
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {T} data - The data to be included in the request body.
 * @returns {Promise<R>} A promise that resolves to the server response data.
 * @throws Will throw an error if the request fails.
 */
export async function patchRecord<T, R>(
  endpoint: string,
  data: T
): Promise<R> {
  return makeRequest<T, R>("PATCH", endpoint, data);
}

/**
 * Sends a DELETE request to delete a record at the specified API endpoint.
 *
 * @param {string} endpoint - The API endpoint to send the request to.
 * @returns {Promise<R>} A promise that resolves to the server response data.
 * @throws Will throw an error if the request fails.
 */
export async function deleteRecord<R>(
  endpoint: string
): Promise<R> {
  return makeRequest<undefined, R>("DELETE", endpoint);
}
