import { ChangeEvent, useEffect, useState } from "react";
import { EventModal } from "./components/Modal/EventModal";
import { ListUsersAndEvents } from "./components/ListUsersAndEvents/ListUsersAndEvents";
import { Menu } from "./components/Menu/Menu";
import { UserModal } from "./components/Modal/UserModal";
import { useData } from "./hooks/useData";
import { TEvent } from "./types/Event";
import { User } from "./types/User";

function App() {
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);
  const [eventModalIsOpen, setEventModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<TEvent[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const {
    isLoading,
    error,
    users,
    events,
    deleteUser,
    deleteEvent,
    fetchData,
  } = useData();

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleOpenModal = (type: string) => {
    if (type === "user") {
      setUserModalIsOpen(true);
      return;
    }

    if (type === "event") {
      setEventModalIsOpen(true);
      return;
    }
  };

  const handleCloseModal = (type: string) => {
    if (type === "user") {
      setUserModalIsOpen(false);
      setSelectedUser(null);
      return;
    }

    if (type === "event") {
      setEventModalIsOpen(false);
      setSelectedEvent(null);
      return;
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setUserModalIsOpen(true);
  };

  const handleEditEvent = (event: TEvent) => {
    setSelectedEvent(event);
    setEventModalIsOpen(true);
  };

  const searchEvents = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredEvents(
      events.filter((event) =>
        event.description
          ?.toLocaleLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };

  const searchUsers = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredUsers(
      users.filter((user) =>
        user.name?.toLocaleLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <main>
      {userModalIsOpen && (
        <UserModal
          closeModal={() => handleCloseModal("user")}
          userData={selectedUser}
          fetchData={fetchData}
        />
      )}
      {eventModalIsOpen && (
        <EventModal
          closeModal={() => handleCloseModal("event")}
          eventData={selectedEvent}
          fetchData={fetchData}
          users={users}
        />
      )}
      <Menu openModal={handleOpenModal} />
      <ListUsersAndEvents
        handleEditUser={handleEditUser}
        handleEditEvent={handleEditEvent}
        isLoading={isLoading}
        users={filteredUsers}
        events={filteredEvents}
        error={error}
        deleteUser={deleteUser}
        deleteEvent={deleteEvent}
        searchEvents={searchEvents}
        searchUsers={searchUsers}
      />
    </main>
  );
}

export default App;
