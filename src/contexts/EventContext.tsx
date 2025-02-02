import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type Event = {
  id: string;
  title: string;
  date: Date;
  allDay: boolean;
  startTime?: string | null;
  endTime?: string | null;
  color: string;
};

type EventContextType = {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (updatedEvent: Event) => void;
  deleteEvent: (eventId: string) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useLocalStorage<Event[]>("events", []);

  const addEvent = (event: Event) => {
    setEvents((prev: Event[]) => [...prev, event]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents((prev: Event[]) =>
      prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents((prevEvents: Event[]) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
}

export const useEventContext = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useEventContext must be used within <EventProvider>");
  }
  return context;
};
