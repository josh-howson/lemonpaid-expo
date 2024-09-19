export const formatTime = (date: Date): string => {
  let hours: number = date.getHours();
  let minutes: number = date.getMinutes();
  const ampm: string = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const minutesStr: string = minutes < 10 ? '0' + minutes : minutes.toString();

  return `${hours}:${minutesStr} ${ampm}`;
}

export function parseTimeToDate(timeString: string): Date {
  const now = new Date();

  const match = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  
  if (!match) {
    throw new Error("Invalid time format. Please use H:MM AM/PM or HH:MM AM/PM.");
  }

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3].toUpperCase();

  if (ampm === "PM" && hours < 12) {
    hours += 12;
  } else if (ampm === "AM" && hours === 12) {
    hours = 0;
  }

  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
  
  return date;
}

