import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useEffect, useRef, useState } from "react";
import { EventModal } from "./modals/EventModal";
import { EventList } from "./EventList";
import { ViewMoreModal } from "./modals/ViewMoreModal";
import { Event, useEventContext } from "../contexts/EventContext";
import { EditEventModal } from "./modals/EditEventModal";

export function CalendarGrid({ current }: { current: Date }) {
  const { events } = useEventContext();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [overflowingDays, setOverflowingDays] = useState<Set<string>>(
    new Set()
  );

  const dayRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const checkOverflow = () => {
      const newOverflowingDays = new Set<string>();

      Object.entries(dayRefs.current).forEach(([dateKey, dayElement]) => {
        if (dayElement) {
          const eventList = dayElement.querySelector(
            ".event-list-container"
          ) as HTMLDivElement;

          if (eventList && eventList.scrollHeight > eventList.clientHeight) {
            newOverflowingDays.add(dateKey);
          }
        }
      });

      setOverflowingDays(newOverflowingDays);
    };

    setTimeout(checkOverflow, 100);

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [events]);

  const visibleDates: Date[] = eachDayOfInterval({
    start: startOfWeek(startOfMonth(current)),
    end: endOfWeek(endOfMonth(current)),
  });

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === current.getMonth();
  };

  const isPastDate = (date: Date) => {
    const today = new Date(current);
    today.setHours(0, 0, 0, 0);
    return isBefore(date, today);
  };

  const handleAddBtnClick = (date: Date) => {
    setSelectedDate(date);
    setIsEventModalOpen(true);
  };

  const handleViewMoreBtnClick = (date: Date) => {
    setSelectedDate(date);
    setIsViewMoreModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsEditEventModalOpen(true);
  };

  return (
    <div className="calendar-grid">
      {visibleDates.map((day, index) => {
        const dateKey = format(day, "yyyy-MM-dd");
        return (
          <div
            key={dateKey}
            ref={(el) => (dayRefs.current[dateKey] = el)}
            className={`calendar-day ${
              !isCurrentMonth(day) ? "out-of-month" : ""
            } ${isPastDate(day) ? "inactive" : ""}`}
          >
            {index < 7 ? (
              <>
                {format(day, "E")}
                <br />
                {format(day, "d")}
              </>
            ) : (
              format(day, "d")
            )}
            <button
              aria-label="open-add-event-modal-btn"
              className="add-btn"
              onClick={() => handleAddBtnClick(day)}
            >
              +
            </button>
            <div className="event-list-container">
              <EventList date={day} onEventClick={handleEventClick} />
            </div>
            {overflowingDays.has(dateKey) && (
              <button
                aria-label="view-more-btn"
                className="view-more-btn"
                onClick={() => handleViewMoreBtnClick(day)}
              >
                View More
              </button>
            )}
          </div>
        );
      })}
      {isEventModalOpen && selectedDate && (
        <EventModal
          date={selectedDate}
          onClose={() => setIsEventModalOpen(false)}
        />
      )}
      {isViewMoreModalOpen && selectedDate && (
        <ViewMoreModal
          date={selectedDate}
          onClose={() => setIsViewMoreModalOpen(false)}
        />
      )}
      {isEditEventModalOpen && selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onClose={() => setIsEditEventModalOpen(false)}
        />
      )}
    </div>
  );
}
