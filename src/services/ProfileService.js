import axios from "axios";
import { DataService } from "./DataService";

export const ProfileService = {
  baseUrl: process.env.REACT_APP_API_URL,

  async getHostProfileInfo() {
    const response = await axios.get(`${this.baseUrl}/hosts/profiles`, {
      headers: DataService.authHeader(),
    });

    return response.data;
  },
};
