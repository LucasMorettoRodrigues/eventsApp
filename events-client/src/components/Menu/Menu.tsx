import styles from "./Menu.module.css";

type Props = {
  openModal: (type: string) => void;
};

export const Menu = ({ openModal }: Props) => {
  return (
    <div className={styles.menu}>
      <h1>EventsApp</h1>
      <div className={styles.buttonsContainer}>
        <button onClick={() => openModal("user")}>Cadastrar Pessoa</button>
        <button onClick={() => openModal("event")}>Criar Evento</button>
      </div>
    </div>
  );
};
