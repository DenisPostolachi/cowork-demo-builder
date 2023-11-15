import axios from "axios";

export const AuthService = {
  baseUrl: process.env.REACT_APP_API_URL,

  async login(email, password) {
    const response = await axios.post(`${this.baseUrl}/login`, {
      email,
      password,
    });

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  async forgetPassword(email) {
    const response = await axios.post(`${this.baseUrl}/password/forget`, {
      email,
    });

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  async clientRegister(payload) {
    return await axios.post(`${this.baseUrl}/clients/registration`, {
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      email_confirmation: payload.email_confirmation,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
      phone_number: payload.phone_number,
    });
  },

  async hostRegister(payload) {
    return await axios.post(`${this.baseUrl}/hosts/registration`, {
      name: payload.name,
      email: payload.email,
      email_confirmation: payload.email_confirmation,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
      phone_number: payload.phone_number,
    });
  },

  async confirmEmail(token) {
    return await axios.post(`${this.baseUrl}/registration/confirm-email`, {
      token: token,
    });
  },

  logout() {
    localStorage.removeItem("user");
  },
};
