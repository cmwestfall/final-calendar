import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import { EventModal } from "./modals/EventModal";
import { EventList } from "./EventList";
import { ViewMoreModal } from "./modals/ViewMoreModal";
import { useEventContext } from "../contexts/EventContext";

export function CalendarGrid({ current }: { current: Date }) {
  const { events } = useEventContext();
  const [isEventModalOpen, setisEventModalOpen] = useState(false);
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    setisEventModalOpen(true);
  };

  const handleViewMoreBtnClick = (date: Date) => {
    setSelectedDate(date);
    setIsViewMoreModalOpen(true);
  };

  return (
    <div className="calendar-grid">
      {visibleDates.map((day, index) => (
        <div
          key={day.toISOString()}
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
            <EventList date={day} />
          </div>
        </div>
      ))}
      {isEventModalOpen && selectedDate && (
        <EventModal
          date={selectedDate}
          onClose={() => setisEventModalOpen(false)}
        />
      )}
    </div>
  );
}
