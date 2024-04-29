import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:5432/api/",
  headers: {
    "Content-Type": "application/json", // Ví dụ: gửi dữ liệu dưới dạng JSON
  },
});

export const get = async (path: string) => {
  const response = await request.get(path);
  return response.data;
};

export const post = async (path: string, options: any) => {
  const response = await request.post(path, options);
  return response.data;
};
export const del = async (path: string) => {
  const response = await request.delete(path);
  return response.data;
};
export const put = async (path: string, data: any) => {
  const response = await request.put(path, data);
  return response.data;
};

export default request;
