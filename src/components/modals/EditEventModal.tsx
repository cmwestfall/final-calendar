import { format } from "date-fns";
import { Event, useEventContext } from "../../contexts/EventContext";
import { useState } from "react";

type EditEventModalProps = {
  event: Event;
  onClose: () => void;
};

export function EditEventModal({ event, onClose }: EditEventModalProps) {
  const { updateEvent, deleteEvent } = useEventContext();
  const [updatedEvent, setUpdatedEvent] = useState<Event>(event);

  const formatTime = (time: Date | string | null | undefined): string => {
    if (!time) return "";
    if (typeof time === "string") return time;

    return format(time, "HH:mm");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedEvent({ ...updatedEvent, title: e.target.value });
  };

  const handleAllDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedEvent({ ...updatedEvent, allDay: e.target.checked });
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "startTime" | "endTime"
  ) => {
    setUpdatedEvent({ ...updatedEvent, [field]: e.target.value });
  };

  const handleColorChange = (color: string) => {
    setUpdatedEvent({ ...updatedEvent, color });
  };

  const handleSave = () => {
    updateEvent(updatedEvent);
    onClose();
  };

  const handleDelete = () => {
    deleteEvent(event.id);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h3>Edit Event</h3>
        <span>{format(event.date, "M/d/yy")}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className="event-title-header">
        <label className="label">Name</label>
        <input
          name="title"
          type="text"
          value={updatedEvent.title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <input
          name="all-day"
          type="checkbox"
          checked={updatedEvent.allDay}
          onChange={handleAllDayChange}
        />{" "}
        All Day?
      </div>
      <div className="start-end-container">
        <div>
          <label>Start Time</label>
          <input
            type="time"
            value={formatTime(updatedEvent.startTime)}
            onChange={(e) => handleTimeChange(e, "startTime")}
            disabled={updatedEvent.allDay}
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="time"
            value={formatTime(updatedEvent.endTime)}
            onChange={(e) => handleTimeChange(e, "endTime")}
            disabled={updatedEvent.allDay}
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
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: color }}
              />
            )
          )}
        </div>
      </div>
      <div className="edit-delete-container">
        <button
          aria-label="edit-event-btn"
          className="edit-event-btn"
          onClick={handleSave}
        >
          Edit
        </button>
        <button
          aria-label="delete-event-btn"
          className="delete-event-btn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
