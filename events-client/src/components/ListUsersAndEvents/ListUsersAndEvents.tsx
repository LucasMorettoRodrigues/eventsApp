import { ChangeEvent } from "react";
import { TEvent } from "../../types/Event";
import { User } from "../../types/User";
import { EventItem } from "./EventItem";
import styles from "./ListUsersAndEvents.module.css";
import { UserItem } from "./UserItem";

type Props = {
  handleEditUser: (user: User) => void;
  handleEditEvent: (event: TEvent) => void;
  isLoading: boolean;
  error: any;
  users: User[];
  events: TEvent[];
  deleteUser: (id: string) => void;
  deleteEvent: (id: string) => void;
  searchEvents: (e: ChangeEvent<HTMLInputElement>) => void;
  searchUsers: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ListUsersAndEvents = ({
  handleEditUser,
  handleEditEvent,
  isLoading,
  error,
  users,
  events,
  deleteUser,
  deleteEvent,
  searchEvents,
  searchUsers,
}: Props) => {
  const getContent = () => {
    // if (isLoading) {
    //   return <p>Loading...</p>;
    // }

    if (error) {
      return <p>Não foi possível conectar com o servidor.</p>;
    }

    return (
      <section className={styles.usersAndEventsSection}>
        <div className={styles.list}>
          <div className={styles.header}>
            <h2>Eventos</h2>
            <input
              onChange={searchEvents}
              placeholder="Pesquisar Eventos"
            ></input>
          </div>
          {events.length === 0 && (
            <p className={styles.emptyList}>Nenhum evento por aqui!</p>
          )}
          {events.map((event) => (
            <EventItem
              key={event.id}
              event={event}
              editEvent={handleEditEvent}
              deleteEvent={deleteEvent}
            />
          ))}
        </div>
        <div className={styles.list}>
          <div className={styles.header}>
            <h2>Pessoas</h2>
            <input
              onChange={searchUsers}
              placeholder="Pesquisar Pessoas"
            ></input>
          </div>
          {users.length === 0 && (
            <p className={styles.emptyList}>Nenhuma pessoa por aqui!</p>
          )}
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              editUser={handleEditUser}
              deleteUser={deleteUser}
            />
          ))}
        </div>
      </section>
    );
  };

  return <>{getContent()}</>;
};
