import { useEffect, useState } from "react";
import { EventsService } from "../services/eventsService";
import { UsersService } from "../services/usersService";
import { TEvent } from "../types/Event";
import { User } from "../types/User";

const usersService = new UsersService();
const eventsService = new EventsService();

export const useData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<TEvent[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const fetchedUsers = await usersService.getAll();
        setUsers(fetchedUsers);

        const fetchedEvents = await eventsService.getAll();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const fetchData = async () => {
    !isLoading && setIsLoading(true);

    try {
      const fetchedUsers = await usersService.getAll();
      setUsers(fetchedUsers);

      const fetchedEvents = await eventsService.getAll();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setIsLoading(true);

    try {
      await usersService.delete(id);
      fetchData();
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    setIsLoading(true);

    try {
      await eventsService.delete(id);
      fetchData();
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    users,
    events,
    fetchData,
    deleteUser,
    deleteEvent,
  };
};
