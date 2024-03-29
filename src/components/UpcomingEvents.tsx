import Celebrate from "../assets/celebrate.png";
import { FcCalendar } from "react-icons/fc";
import dayjs from "dayjs";
import { useState } from "react";
import EventDetailsModal from "./EventDetailsModal";

interface UpcomingEventsProps {
  events: CustomEvent[];
  selectDate: any;
  currentDate: any;
  deleteEvent: (eventToDelete: CustomEvent) => void;
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

const UpcomingEvents = ({
  events,
  selectDate,
  currentDate,
  deleteEvent,
}: UpcomingEventsProps) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);

  const openDetailsModal = (event: CustomEvent) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleCompleteEvent = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent);
      closeDetailsModal();
    }
  };

  return (
    <>
      <div className="  my-[10px] text-[18px] font-medium">Upcoming events</div>

      {events.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <img
            src={Celebrate}
            className="h-[45px] w-[45px] mt-[33px] mb-[10px]"
          />
          <div className="text-[12px] text-[#333333] font-medium mb-[28px]">
            No upcoming events
          </div>
        </div>
      )}

      {selectDate.format("YYYY-MM-DD") === currentDate.format("YYYY-MM-DD") ? (
        ""
      ) : (
        <div className="mb-[28px] ">
          <div className="flex items-center gap-[8px]">
            <FcCalendar className="w-8 h-8 cursor-pointer" />

            <div className="text-[16px] text-[#333333] font-medium">
              {selectDate.toDate().toDateString()}
            </div>
          </div>
          <div>
            {events.filter((event) => {
              const eventDate = dayjs(event.selectedDate, "YYYY-MM-DD");
              return eventDate.isSame(selectDate, "day");
            }).length === 0 ? (
              <div>
                No events for{" "}
                {selectDate.toDate().toLocaleDateString("en-US", {
                  month: "short",
                  // day: "numeric",
                  day: "2-digit",
                })}
              </div>
            ) : (
              events
                .filter((event) => {
                  const eventDate = dayjs(event.selectedDate, "YYYY-MM-DD");
                  return eventDate.isSame(selectDate, "day");
                })
                .map((event, index) => (
                  <div
                    key={index}
                    onClick={() => openDetailsModal(event)} // Open details modal on click
                    style={{ cursor: "pointer" }} // Change cursor to pointer on hover
                  >
                    <div className="flex justify-between m-[4px] mr-[8px]">
                      <div>
                        <span className="pr-[2px]">{event.selectedEmoji}</span>
                        <span
                          className={`text-[10px] leading-[10px] font-medium ${
                            event.eventName.length > 27 ? "truncate" : ""
                          }`}
                        >
                          {event.eventName.length > 27
                            ? event.eventName.substring(0, 25) + "..."
                            : event.eventName}
                        </span>
                      </div>
                      <div>
                        <span>{event.endTime}</span>
                      </div>
                    </div>
                  </div>
                ))
            )}
            {/* No events for
              {selectDate.toDate().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })} */}
          </div>
        </div>
      )}

      {showDetailsModal && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={closeDetailsModal}
          onComplete={handleCompleteEvent}
        />
      )}
    </>
  );
};

export default UpcomingEvents;
