// Initialize Cloud Firestore through Firebase
import { EventApi } from "@fullcalendar/react";
import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { RoomType } from "./types";

const firebaseConfig = { 
  apiKey: "AIzaSyBD0WOWwcOIG3CzMVqE1NDddXRjKRqN4OE",
  authDomain: "scheduler-a301e.firebaseapp.com",
  projectId: "scheduler-a301e",
  storageBucket: "scheduler-a301e.appspot.com",
  messagingSenderId: "792678753916",
  appId: "1:792678753916:web:959e63b8f5f5ed3d9d8bf9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

async function addEvent(type: RoomType, event: any, callback: any) {
  if (!type || !event?.id) return;

  await setDoc(doc(db, type, event.id), { 
    id: event.id,
    title: event?.title,
    start: event?.start,
    end: event?.end,
    extendedProps: event?.extendedProps,
  });
  callback();
}
function changeEvent(type: RoomType, event: EventApi) {
  if (!type || !event?.id) return;

  setDoc(doc(db, type, event.id), { 
    id: event.id,
    title: event?.title,
    start: event?.startStr,
    end: event?.endStr,
    extendedProps: event?.extendedProps,
  });
}
async function deleteEvent(type: RoomType, event: EventApi, callback: any) {
  if (!type) return;
  await deleteDoc(doc(db, type, event?.id)); 
  callback();
}

export { app, db, addEvent, changeEvent, deleteEvent }; 
