import { format } from "date-fns";
import { useFilteredEvents } from "../../hooks/useFilteredEvent";

type ViewMoreProps = {
  date: Date;
  onClose: () => void;
};

export function ViewMoreModal({ date, onClose }: ViewMoreProps) {
  const events = useFilteredEvents(date);

  return (
    <>
      <div className="modal">
        <div className="modal-header">
          <h3>{format(date, "m/d/yy")}</h3>
          <button className="close-btn" onClick={onClose}>
            {"X"}
          </button>
        </div>
        {events.map((event) => (
          <div
            key={event.id}
            className="event all-day-event"
            style={{ backgroundColor: event.color }}
          >
            {event.title}
          </div>
        ))}
      </div>
    </>
  );
}
