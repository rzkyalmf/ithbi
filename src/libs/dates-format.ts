const formatDate = (dateTimeString: Date): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (dateTimeString: Date): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDay = (dateTimeString: Date): string => {
  const date = new Date(dateTimeString);
  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  return days[date.getDay()];
};

// Tambahan untuk input date default value
const formatInputDate = (dateTimeString?: Date): string => {
  if (!dateTimeString) return "";
  return dateTimeString.toISOString().split("T")[0];
};

// Tambahan untuk input time default value
const formatInputTime = (dateTimeString?: Date): string => {
  if (!dateTimeString) return "";
  const hours = dateTimeString.getHours().toString().padStart(2, "0");
  const minutes = dateTimeString.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export { formatDate, formatDay, formatTime, formatInputDate, formatInputTime };
