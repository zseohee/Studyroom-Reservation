import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/react";
import React, { useState } from "react";
import styled from "styled-components";
import { addEvent, changeEvent, deleteEvent } from "./db";
import { checkTimes, colors, getUuidv4, todayStr } from "./event-utils";
import Modal from "./Modal";
import { dayGridPlugin, interactionPlugin, timeGridPlugin } from "./plugin";
import { ModalData, RoomType } from "./types";
import useData from "./useData";

export default function Calendar() { 
  const [type, setType] = useState<RoomType>("room1");  
  const [open, setOpen] = useState<boolean>(false); 
  const [modalData, setModalData] = useState<ModalData>({});  

  const { roomEvents, getRoomData, reloadRoomData } = useData({ room: type });
  const customButtons = {
    room1: {
      text: "ROOM1",
      click: () => {
        setType("room1");
      },
    },
    room2: {
      text: "ROOM2",
      click: () => {
        setType("room2");
      },
    },
    room3: {
      text: "ROOM3",
      click: () => {
        setType("room3");
      },
    },
    room4: {
      text: "ROOM4",
      click: () => {
        setType("room4");
      },
    },
    room5: {
      text: "ROOM5",
      click: () => {
        setType("room5");
      },
    },
  };
  
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const calendarApi = selectInfo.view.calendar;
    if (selectInfo.start < new Date()) { 
      calendarApi.unselect();
      alert("Please make a reservation in advance.");
      return;
    }
    if (checkTimes(selectInfo, roomEvents)) {
      calendarApi.unselect();
      alert("This time is already reserved. Please select another time.");  
      return;
    }
    setModalData({
      selectInfo, 
      title: "", 
      password: "", 
      members: "", 
    });
    setOpen(true); 
  };

  const handleConfirmClick = () => {
    const calendarApi = modalData?.selectInfo?.view.calendar;
    if (!calendarApi) return;
    addEvent( 
      type,
      {
        id: getUuidv4(),
        title: modalData.title,
        start: modalData?.startStr || modalData?.selectInfo?.startStr,
        end: modalData?.endStr || modalData?.selectInfo?.endStr,
        extendedProps: {
          password: modalData?.password,
          members: modalData?.members,
        },
      },
      () => getRoomData(type)
    );
    calendarApi.unselect(); 
    setModalData({});
    setOpen(false);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    let password = prompt("Please enter your password to cancel reservation."); 
    if (password === clickInfo.event.extendedProps?.password || password === "hello@") { 
      clickInfo.event.remove(); 
    }
    else {
      alert("Wrong Password. Please enter again.");
    }
  };
  const handleChangeEvent = ({ event }: { event: EventApi }) => {
    let title = prompt("Please enter your password to change reservation.");
    if (title === event.extendedProps?.password || title === "hello@") {
      changeEvent(type, event); 
    }
    else {
      alert("Wrong Password. Please enter again.");
    }
  };
  const handleDeleteEvent = ({ event }: { event: EventApi }) => {
    deleteEvent(type, event, () => reloadRoomData(type));
  };


  return (
    <StyleWrapper>
      <FullCalendar
        
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{ 
          left: "room1,room2,room3,room4,room5",
          center: "",
          right: "prev,next",
        }}
        slotLabelFormat={{ 
          hour: "numeric",
          minute: "2-digit",
          meridiem: 'short'
        }}
        
        initialView="timeGridWeek"
        initialDate={todayStr}
        editable
        selectable
        selectMirror={true}
        dayMaxEvents={true}
        weekends
        scrollTime={'12:00:00'}
        expandRows
        stickyHeaderDates
        events={roomEvents}  
        select={handleDateSelect}
        eventContent={renderEventContent} 
        eventClick={handleEventClick}
        customButtons={customButtons}
        eventRemove={handleDeleteEvent}
        eventChange={handleChangeEvent}
        allDaySlot={false}
        eventBackgroundColor={colors[type]} 
        eventBorderColor={colors[type]}
      />

      <Modal
        data={modalData}
        setData={setModalData}
        open={open}
        setOpen={setOpen}
        confirm={handleConfirmClick}
      />

    </StyleWrapper>
  );
}

const renderEventContent = (eventContent: EventContentArg) => {
  return (
    <EventBox>
      <EventTitle>{eventContent.event.title}</EventTitle>
      <EventMembers>{eventContent.event.extendedProps?.members}</EventMembers>
    </EventBox>
  );
};

export const StyleWrapper = styled.div`
  width: 100vw;
  height: 100%;

.fc {
  font-size: 1.2rem;
}
.fc-toolbar-title {
  font-size: 1.6rem;
  content: "Text";
}
.fc-toolbar-chunk {
  font-size: 1rem;
}
.fc-button-group {
  background: #7b9acc;
}
/* 일요일 날짜 빨간색 */
.fc-day-sun a {
  color: red;
  text-decoration: none;
}

/* 토요일 날짜 파란색 */
.fc-day-sat a {
  color: blue;
  text-decoration: none;
}

`;

const EventBox = styled.div`
  overflow: hidden;
`;
const EventTitle = styled.div`
  font-weight: bold;
  font-size: 0.2rem;
`;
const EventMembers = styled.div`
  font-size: 0.2rem;
`;
