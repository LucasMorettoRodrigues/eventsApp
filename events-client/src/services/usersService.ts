import axios from "axios";
import { User } from "../types/User";
import { transformUsersDates } from "../utils/helpers";
import { baseUrl } from "./apiURL";

type UserRequestBody = {
  name: string;
};

export class UsersService {
  apiUrl = `${baseUrl}/users`;

  async getAll() {
    const result = await axios.get(this.apiUrl);
    return transformUsersDates(result.data);
  }

  async getUser(id: string) {
    return await axios.get(`${this.apiUrl}/${id}`);
  }

  async create(user: User) {
    return await axios.post(this.apiUrl, user);
  }

  async update(id: string, user: UserRequestBody) {
    return await axios.put(`${this.apiUrl}/${id}`, user);
  }

  async delete(id: string) {
    return await axios.delete(`${this.apiUrl}/${id}`);
  }
}
