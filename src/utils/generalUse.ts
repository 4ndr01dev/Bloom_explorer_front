export const formatDate = (dateString: string): string => {
  // Asumimos que la fecha viene en formato UTC
  const date = new Date(dateString);

  // Formateamos la fecha en un formato más legible
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
    hour12: false
  }).format(date);
};
