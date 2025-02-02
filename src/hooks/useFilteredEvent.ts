import { Event, useEventContext } from "../contexts/EventContext";
import { format } from "date-fns";

export function useFilteredEvents(date: Date | null): Event[] {
  const { events } = useEventContext();

  if (!date) return [];

  return events.filter(
    (event) => format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );
}
