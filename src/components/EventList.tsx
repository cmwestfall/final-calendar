import { format } from "date-fns";
import { useFilteredEvents } from "../hooks/useFilteredEvent";
import { Event } from "../contexts/EventContext";

type EventListProps = {
  date: Date;
  onEventClick: (event: Event) => void;
};

export function EventList({ date, onEventClick }: EventListProps) {
  const dayEvents = useFilteredEvents(date);

  const allDayEvents = dayEvents.filter((event) => event.allDay);

  const timedEvents = dayEvents.filter(
    (event) => !event.allDay && event.startTime && event.endTime
  );

  const sortedTimedEvents = timedEvents.sort((a, b) => {
    const startA = a.startTime
      ? new Date(`${format(date, "yyyy-MM-dd")}T${a.startTime}:00`)
      : new Date(0);
    const startB = b.startTime
      ? new Date(`${format(date, "yyyy-MM-dd")}T${b.startTime}:00`)
      : new Date(0);
    return startA.getTime() - startB.getTime();
  });

  return (
    <div className="events-lists">
      {allDayEvents.map((event) => (
        <div
          key={event.id}
          className="event all-day-event"
          style={{ backgroundColor: event.color }}
          onClick={() => onEventClick(event)}
        >
          {event.title}
        </div>
      ))}
      <ul>
        {sortedTimedEvents.map((event) => (
          <li
            style={{ color: event.color }}
            key={event.id}
            className="event"
            onClick={() => onEventClick(event)}
          >
            <div className="event-time-title">
              <span className="event-time">
                {event.startTime
                  ? format(
                      new Date(
                        `${format(date, "yyyy-MM-dd")}T${event.startTime}:00`
                      ),
                      "h:mm a"
                    )
                  : "No start time"}
              </span>
              {event.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
