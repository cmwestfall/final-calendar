import { format } from "date-fns";
import { useEventContext } from "../contexts/EventContext";

type EventListProps = {
  date: Date;
};

export function EventList({ date }: EventListProps) {
  const { events } = useEventContext();

  const dayEvents = events.filter(
    (event) => format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

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
        >
          {event.title}
        </div>
      ))}
      <ul>
        {sortedTimedEvents.map((event) => (
          <li style={{ color: event.color }} key={event.id} className="event">
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
