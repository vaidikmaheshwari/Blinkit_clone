
import axiosInstance from "./axios";

const commonApiFunction = async (
  method: string,
  url: string,
  accessToken?: string|null,
  payload = {},
  contentType = "application/json"
) => {
  try {
    const headers = {Authorization: ""};
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    const config = {
      method: method.toLowerCase(),
      url,
      headers: {
        "Content-Type": contentType,
        ...headers,
      },
    };

    if (["post", "put", "delete"].includes(method.toLowerCase())) {
      config.data = payload;
    }

    const response = await axiosInstance(config);
    console.log("API_CALLED:- ", url);
    console.log("API_RESPONSE:- ", response);

    return response;
  } catch (error) {
    console.log("API_CALLED:- ", url);
    console.log("API_ERROR_RESPONSE:- ", error);
    return error;
  }
};

export default commonApiFunction;