import { useState } from "react";
import { useEventContext } from "../../contexts/EventContext";
import { format } from "date-fns";

type EventModalProps = {
  date: Date;
  onClose: () => void;
};

export function EventModal({ date, onClose }: EventModalProps) {
  const { addEvent } = useEventContext();
  const [isAllDay, setIsAllDay] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("#000000");

  const handleSubmit = () => {
    if (!eventTitle) {
      alert("Event must have a title");
      return;
    }

    if (endTime < startTime) {
      alert("End time must come after the start time");
    }

    addEvent({
      id: Date.now().toString(),
      title: eventTitle,
      date,
      allDay: isAllDay,
      startTime: isAllDay ? null : startTime,
      endTime: isAllDay ? null : endTime,
      color,
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h3>Add Event</h3>
        <span>{format(date, "M/d/yy")}</span>
        <button className="close-btn" onClick={onClose}>
          {"X"}
        </button>
      </div>
      <div className="event-title-header">
        <label className="label">Name</label>
        <input
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Event Title"
        />
      </div>
      <div>
        <input
          type="checkbox"
          checked={isAllDay}
          onChange={(e) => setIsAllDay(e.target.checked)}
        />{" "}
        All Day?
      </div>
      <div className="start-end-container">
        <div>
          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            disabled={isAllDay}
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={isAllDay}
          />
        </div>
      </div>
      <div className="color-selector-container">
        <label className="label">Color</label>
        <div className="color-btn-list">
          {["hsl(0, 75%, 60%)", "hsl(200, 80%, 50%)", "hsl(150, 80%, 30%)"].map(
            (color) => (
              <button
                aria-label={`${color} button`}
                className="color-button"
                key={color}
                onClick={() => setColor(color)}
                style={{ backgroundColor: color }}
              />
            )
          )}
        </div>
      </div>
      <button
        aria-label="save-event-btn"
        className="save-event-btn"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
}
