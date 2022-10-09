import axios from "axios";
import { transformEventsDates } from "../utils/helpers";
import { baseUrl } from "./apiURL";

type EventRequestBody = {
  description: string;
  date: Date;
  userIds: string[];
};

export class EventsService {
  apiUrl = `${baseUrl}/events`;

  async getAll() {
    const result = await axios.get(this.apiUrl);
    return transformEventsDates(result.data);
  }

  async getEvent(id: string) {
    return await axios.get(`${this.apiUrl}/${id}`);
  }

  async update(id: string, event: EventRequestBody) {
    return await axios.put(`${this.apiUrl}/${id}`, event);
  }

  async create(event: EventRequestBody) {
    return await axios.post(this.apiUrl, event);
  }

  async delete(id: string) {
    return await axios.delete(`${this.apiUrl}/${id}`);
  }
}
