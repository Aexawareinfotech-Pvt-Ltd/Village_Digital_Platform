import axios from "axios";

const API_KEY = import.meta.env.VITE_MANDI_API_KEY;
const BASE_URL = import.meta.env.VITE_MANDI_BASE_URL;

export const fetchMandiPrices = async ({ state, district, limit = 100 }) => {
  const response = await axios.get(BASE_URL, {
    params: {
      "api-key": API_KEY,
      format: "json",
      offset: 0,
      limit,
      "filters[state]": state,
      "filters[district]": district,
    },
  });

  return response.data.records || [];
};
