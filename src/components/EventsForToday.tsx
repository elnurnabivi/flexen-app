import { FcCalendar } from "react-icons/fc";
import dayjs from "dayjs";

interface EventsForTodayProps {
  events: Event[];
  today: any;
}
interface Event {
  eventName: string;
  selectedEmoji: string;
  eventDescription: string;
  selectedDate: string;
  startTime: string;
  endTime: string;
  selectedColor: string;
}

const EventsForToday = ({ events, today }: EventsForTodayProps) => {
  return (
    <div className=" mb-[28px]">
      <div className="flex items-center gap-[8px]">
        <FcCalendar className="w-8 h-8 cursor-pointer" />
        <div className="text-[16px] text-[#333333] font-medium">Today</div>
      </div>
      {/* <div>Schedule for {today.toDate().toDateString()}</div> */}
      <div>
        {events.filter((event) => {
          const eventDate = dayjs(event.selectedDate, "YYYY-MM-DD");
          return eventDate.isSame(today, "day");
        }).length === 0 ? (
          <div>No events for today</div>
        ) : (
          events
            .filter((event) => {
              const eventDate = dayjs(event.selectedDate, "YYYY-MM-DD");
              return eventDate.isSame(today, "day");
            })
            .map((event, index) => (
              <div key={index}>
                <div className="flex justify-between m-[4px] mr-[8px]">
                  <div>
                    <span className="pr-[2px]">{event.selectedEmoji}</span>
                    <span>{event.eventName}</span>
                  </div>
                  <div>
                    <span>{event.startTime}</span>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default EventsForToday;
