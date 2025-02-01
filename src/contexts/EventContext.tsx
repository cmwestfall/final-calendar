import { createContext, ReactNode, useContext, useState } from "react";

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
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
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
