import { useState } from "react";
import { User } from "../../types/User";
import { dateToTime } from "../../utils/helpers";
import styles from "./ListUsersAndEvents.module.css";

type Props = {
  user: User;
  editUser: (user: User) => void;
  deleteUser: (id: string) => void;
};

export const UserItem = ({ user, editUser, deleteUser }: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className={styles.row}>
        <p>{user.name}</p>
        <div className={styles.buttonsContainer}>
          <button
            className="small"
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            {showDetails ? "Esconder Eventos" : "Mostrar Eventos"}
          </button>
          <button className="small" onClick={() => editUser(user)}>
            Editar
          </button>
          <button className="small" onClick={() => deleteUser(user.id!)}>
            Deletar
          </button>
        </div>
      </div>
      {showDetails && (
        <div className={styles.subItemsContainer}>
          <p className={styles.subItemsHeader}>Eventos de {user.name}:</p>
          {user.events!.length > 0 ? (
            user.events!.map((item) => (
              <div key={item.event.id} className={styles.subItem}>
                <p>{item.event.description}</p>
                <p className={styles.date}>
                  {item.event.date?.toLocaleDateString("pt-br")} às{" "}
                  {dateToTime(item.event.date)} horas
                </p>
              </div>
            ))
          ) : (
            <div className={styles.subItem}>
              <p style={{ textAlign: "center" }}>
                {user.name} não está em nenhum evento.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
