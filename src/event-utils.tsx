import { DateSelectArg, EventInput } from "@fullcalendar/react";
//let: declare a variable 
let eventGuid = 0;
export const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
    end: todayStr + "T15:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}

export function getUuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) { 
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getFormat(x: string | undefined) {

  if (!x) return ""; 
  return x?.split("T")[0] + " " + x?.split("T")[1].split("+")[0];
}

export function setFormat(x: string | undefined, timezone: string): string {
  return x?.split(" ")[0] + "T" + x?.split(" ")[1] + timezone;
}

export const colors = { 
  room1: "#F8BBD0",
  room2: "#E040FB",
  room3: "#7986CB",
  room4: "#80DEEA",
  room5: "#FFEB3B",
};

export function checkTimes(selectInfo: DateSelectArg, events: any) {
  const start = selectInfo.startStr; 
  const end = selectInfo.endStr;  
  return !events.every((x: EventInput) => {
    if (!x.start || !x.end) return false;
    return (
      (start <= x.start && end <= x.start) || (start >= x.end && end >= x.end)
    );
  });
}
