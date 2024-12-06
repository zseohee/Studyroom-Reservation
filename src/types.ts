import { DateSelectArg } from "@fullcalendar/react";

export type RoomType = "room1" | "room2" | "room3" | "room4" | "room5"; 
export type ModalData = {
  title?: string;
  password?: string;
  members?: string;
  selectInfo?: DateSelectArg;
  startStr?: string;
  endStr?: string;
};
