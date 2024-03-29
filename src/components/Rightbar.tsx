import { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import RightbarHeader from "./RightbarHeader";
import WeeklyView from "./WeeklyView";
// import AdditionalEventsModal from "./AdditionalEventsModal";

interface RightbarProps {
  currentDate: Dayjs;
  selectDate: any;
  setSelectDate: any;
  events: CustomEvent[];
  addEvent: (event: CustomEvent) => void;
  // deleteEvent: (eventName: Event) => void;
  deleteEvent: (eventToDelete: CustomEvent) => void;

  // deleteEvent: (event: Event) => void;
}

interface CustomEvent {
  eventName: string;
  selectedEmoji: string;
  eventDescription: string;
  selectedDate: string;
  // startTime: string;
  endTime: string;
  selectedColor: string;
}

const Rightbar = ({
  currentDate,
  selectDate,
  setSelectDate,
  events,
  addEvent,
  deleteEvent,
}: RightbarProps) => {
  const [today, setToday] = useState(currentDate);
  useEffect(() => {
    const isDifferentMonth = selectDate.month() !== today.month();

    if (isDifferentMonth) {
      setToday(selectDate);
    }
  }, [selectDate]);

  return (
    <div className="flex flex-col w-full">
      <RightbarHeader today={today} setToday={setToday} addEvent={addEvent} />
      <WeeklyView
        today={today}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        events={events}
        deleteEvent={deleteEvent}
      />
      {/* <AdditionalEventsModal
        events={events}
        selectDate={selectDate}
        onClose={() => {}} // You need to define onClose function
      /> */}
    </div>
  );
};

export default Rightbar;
