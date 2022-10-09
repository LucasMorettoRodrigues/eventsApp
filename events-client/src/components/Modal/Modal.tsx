import { ReactNode } from "react";
import styles from "./Modal.module.css";

type Props = {
  title: string;
  children: ReactNode;
  closeModal: () => void;
};

export const Modal = ({ title, closeModal, children }: Props) => {
  return (
    <div className={styles.modal}>
      <div onClick={closeModal} className={styles.background}></div>
      <div className={styles.content}>
        <div className={styles.title}>
          <p className={styles.closeButton} onClick={closeModal}>
            X
          </p>
          <h3>{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};
