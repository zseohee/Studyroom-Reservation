/* eslint-disable */
import { EventInput } from "@fullcalendar/react";
import { collection, getDocs, query } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "./db";
import { RoomType } from "./types";

interface Props {
  room: RoomType;
}
export default function useData({ room }: Props) { 
  const [roomEvents, setRoomEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    setRoomEvents([]);
    getRoomData(room);
  }, [room]);

  async function getRoomData(room: RoomType) {
    const q = query(collection(db, room)); 
    const querySnapshot = await getDocs(q); 
    querySnapshot.forEach((doc) => {
      setRoomEvents((prev) => [
        ...prev.filter((x) => x.id !== doc.data().id), 
        doc.data() as EventInput,
      ]);
    });
  }
  async function reloadRoomData(room: RoomType) {
    const q = query(collection(db, room));
    const querySnapshot = await getDocs(q);
    setRoomEvents([]);
    querySnapshot.forEach((doc) => {
      setRoomEvents((prev) => [
        ...prev.filter((x) => x.id !== doc.data().id),
        doc.data() as EventInput,
      ]);
    });
  }

  return { roomEvents, getRoomData, reloadRoomData }; 
}
