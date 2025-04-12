import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "http://srvr.bordoshoes.uz/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Reusable GET function
export const get = async <T>(url: string, params: Record<string, unknown> = {}): Promise<T> => {
  const response = await apiClient.get<T>(url, { params });
  return response.data;
};

// Reusable POST function
export const post = async <T, D = Record<string, unknown>>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

// Reusable PUT function
export const put = async <T, D = Record<string, unknown>>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};

export default apiClient;
