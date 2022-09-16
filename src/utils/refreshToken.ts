import api from "./apiConfig";

const refreshToken = async () => {
  try {
    const { data } = await api.post("/refresh", [], {
      headers: { Authorization: `Bearer ${localStorage.getItem("refresh")}` },
    });

    if (data) {
      localStorage.setItem("token", data.access_token);
      return data.access_token;
    }
  } catch (error) {
    console.log(error);
  }
};

export default refreshToken;
