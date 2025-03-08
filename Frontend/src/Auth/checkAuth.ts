import { UseAuthStore } from "../Global/store";
import axios from "axios";

const accessToken = UseAuthStore((state) => state.accessToken);
// const refreshToken=UseAuthStore((state)=>state.refreshToken)
export const check = async () => {
  try {
    const checkValue = await axios.get("http://localhost:3300/check", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return checkValue;
  } catch (err) {
    console.log(err.message);
  }
};
