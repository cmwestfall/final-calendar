import { useCurrentDateContext } from "../contexts/TodayContext";

import { CalendarGrid } from "./CalendarGrid";

export function Calendar() {
  const { currentDate } = useCurrentDateContext();

  return (
    <>
      <CalendarGrid current={currentDate} />
    </>
  );
}
