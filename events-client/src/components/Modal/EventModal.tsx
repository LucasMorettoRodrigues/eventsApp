import { ChangeEvent, useState } from "react";
import { EventsService } from "../../services/eventsService";
import { TEvent } from "../../types/Event";
import { User } from "../../types/User";
import {
  getToday,
  dateToString,
  getTimeList,
  dateToTime,
} from "../../utils/helpers";
import { Modal } from "./Modal";
import Select from "react-select";

type Props = {
  closeModal: () => void;
  eventData: TEvent | null;
  users: User[];
  fetchData: () => {};
};

export const EventModal = ({
  closeModal,
  eventData,
  fetchData,
  users,
}: Props) => {
  const eventService = new EventsService();
  const [isLoading, setIsLoading] = useState(false);
  const today = getToday();
  const [input, setInput] = useState({
    description: { value: eventData?.description || "", isValid: true },
    date: { value: dateToString(eventData?.date) || today!, isValid: true },
    time: {
      value: dateToTime(eventData?.date) || "12:00",
      isValid: true,
    },
    users: eventData
      ? (eventData?.users!.map((users) => users.user.id) as string[])
      : [],
  });

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInput({
      ...input,
      [e.target.name]: { value: e.target.value, isValid: true },
    });
  };

  const handleUsersChange = (selectedOption: any) => {
    const users = selectedOption.map((option: any) => option.value);
    setInput({ ...input, users });
  };

  const createEvent = async () => {
    let isValid = true;

    if (!input.description.value) {
      setInput({ ...input, description: { value: "", isValid: false } });
      isValid = false;
    }

    if (!input.date.value) {
      setInput({ ...input, date: { value: today!, isValid: false } });
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);

    const event = {
      description: input.description.value,
      date: new Date(`${input.date.value}T${input.time.value}:00.000-03:00`),
      userIds: input.users,
    };

    eventData
      ? await eventService.update(eventData.id!, event)
      : await eventService.create(event);

    fetchData();

    setIsLoading(false);
    closeModal();
  };

  const customStyles = {
    control: () => ({
      outlineColor: "lightgray",
      display: "flex",
      borderRadius: "10px",
      backgroundColor: "rgba(211, 211, 211, 0.5)",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "13px",
      color: "#777",
    }),
  };

  return (
    <Modal
      title={eventData ? "Editar Evento" : "Criar Evento"}
      closeModal={closeModal}
    >
      <div className="inputContainer">
        <label
          className={input.description.isValid ? undefined : "invalid"}
          htmlFor="description"
        >
          Descrição
        </label>
        <input
          className={input.description.isValid ? undefined : "invalid"}
          onChange={handleChange}
          value={input.description.value}
          name="description"
          placeholder="Digite a descrição do evento"
        ></input>
      </div>
      <div className="inputContainer">
        <label
          className={input.date.isValid ? undefined : "invalid"}
          htmlFor="date"
        >
          Data do Evento
        </label>
        <input
          className={input.date.isValid ? undefined : "invalid"}
          onChange={handleChange}
          value={input.date.value}
          name="date"
          type="date"
        ></input>
      </div>
      <div className="inputContainer">
        <label
          className={input.date.isValid ? undefined : "invalid"}
          htmlFor="hour"
        >
          Horarío do Evento
        </label>
        <select
          className={input.time.isValid ? undefined : "invalid"}
          onChange={handleChange}
          value={input.time.value}
          name="time"
        >
          {getTimeList().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="inputContainer">
        <label
          className={input.date.isValid ? undefined : "invalid"}
          htmlFor="date"
        >
          Participantes
        </label>
        <Select
          placeholder="Adicione Participantes"
          styles={customStyles}
          isMulti
          options={userOptions}
          defaultValue={
            eventData &&
            eventData.users?.map((user) => ({
              value: user.user.id,
              label: user.user.name,
            }))
          }
          onChange={handleUsersChange}
        />
      </div>
      <button disabled={isLoading} onClick={createEvent}>
        {isLoading ? "Aguarde" : "Salvar"}
      </button>
    </Modal>
  );
};
