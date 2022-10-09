import { ChangeEvent, useState } from "react";
import { UsersService } from "../../services/usersService";
import { User } from "../../types/User";
import { Modal } from "./Modal";

type Props = {
  closeModal: () => void;
  userData: User | null;
  fetchData: () => {};
};

export const UserModal = ({ closeModal, userData, fetchData }: Props) => {
  const userService = new UsersService();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [input, setInput] = useState({
    name: { value: userData?.name || "", isValid: true },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: { value: e.target.value, isValid: true },
    });
  };

  const createUser = async () => {
    if (!input.name.value) {
      setInput({ ...input, name: { value: "", isValid: false } });
      return;
    }

    setIsLoading(true);

    const user = {
      name: input.name.value,
    };

    try {
      userData
        ? await userService.update(userData.id!, user)
        : await userService.create(user);
    } catch (error) {
      console.error(error);
      setError(true);
      setIsLoading(false);
      return;
    }

    fetchData();

    setIsLoading(false);
    closeModal();
  };

  return (
    <Modal
      title={userData ? "Editar Pessoa" : "Criar Pessoa"}
      closeModal={closeModal}
    >
      <div className="inputContainer">
        <label
          className={input.name.isValid ? undefined : "invalid"}
          htmlFor="name"
        >
          Nome
        </label>
        <input
          className={input.name.isValid ? undefined : "invalid"}
          onChange={handleChange}
          value={input.name.value}
          name="name"
          placeholder="Digite o nome da pessoa"
        ></input>
      </div>
      {error && (
        <p className="error">Desculpe, não foi possível completar a ação.</p>
      )}
      <button disabled={isLoading} onClick={createUser}>
        {isLoading ? "Aguarde" : "Salvar"}
      </button>
    </Modal>
  );
};
