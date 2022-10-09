export const formatDate = (date: string | undefined): string => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pt-br");
};

export const dateToString = (date: Date | undefined) => {
  if (!date) return;
  return `${date.toISOString().slice(0, 10)}`;
};

export const getToday = () => {
  return dateToString(new Date());
};

export const getTimeList = () => {
  const hours = Array.from(Array(24).keys()).map((hour) =>
    hour < 10 ? `0${hour}` : `${hour}`
  );
  const minutes = Array.from(Array(4).keys()).map((minutes) =>
    minutes === 0 ? `0${minutes * 15}` : `${minutes * 15}`
  );
  const time: string[] = [];
  hours.forEach((hour) => {
    minutes.forEach((minute) => {
      time.push(`${hour}:${minute}`);
    });
  });
  return time;
};

export const dateToTime = (date: Date | undefined) => {
  if (!date) return;
  return date.toString().slice(16, 21);
};

export const transformUsersDates = (users: any) => {
  return users.map((user: any) => ({
    ...user,
    events: user.events.map((event: any) => ({
      event: {
        ...event.event,
        date: new Date(event.event.date),
      },
    })),
  }));
};
export const transformEventsDates = (events: any) => {
  return events.map((event: any) => ({
    ...event,
    date: new Date(event.date),
  }));
};
