import styles from "./ListUsersAndEvents.module.css";
import { TEvent } from "../../types/Event";
import { useState } from "react";
import { dateToTime } from "../../utils/helpers";

type Props = {
  event: TEvent;
  editEvent: (event: TEvent) => void;
  deleteEvent: (id: string) => void;
};

export const EventItem = ({ event, editEvent, deleteEvent }: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className={styles.row}>
        <p>{event.description}</p>
        <p className={styles.date}>
          {event.date?.toLocaleDateString("pt-br")} às {dateToTime(event.date)}{" "}
          horas
        </p>
        <div className={styles.buttonsContainer}>
          <button
            className="small"
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            {showDetails ? "Esconder Participantes" : "Ver Participantes"}
          </button>
          <button className="small" onClick={() => editEvent(event)}>
            Editar
          </button>
          <button className="small" onClick={() => deleteEvent(event.id!)}>
            Deletar
          </button>
        </div>
      </div>
      {showDetails && (
        <div className={styles.subItemsContainer}>
          <p className={styles.subItemsHeader}>
            Participantes do evento {event.description}:
          </p>
          {event.users!.length > 0 ? (
            event.users!.map((item) => (
              <div key={item.user.id} className={styles.subItem}>
                <p>{item.user.name}</p>
              </div>
            ))
          ) : (
            <div className={styles.subItem}>
              <p style={{ textAlign: "center" }}>
                {event.description} não possue participantes.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
