import { format, addMonths } from "date-fns";
import { useCurrentDateContext } from "../contexts/TodayContext";

export function Header() {
  const { currentDate, setCurrentDate } = useCurrentDateContext();
  return (
    <div className="calendar-header-container">
      <button
        aria-label="return-to-current-month-btn"
        className="today-btn"
        onClick={() => setCurrentDate(new Date())}
      >
        Today
      </button>
      <button
        aria-label="prev-month-btn"
        className="prev-month-btn"
        onClick={() => setCurrentDate(addMonths(currentDate, -1))}
      >
        {"<"}
      </button>
      <button
        aria-label="next-month-btn"
        className="next-month-btn"
        onClick={() => setCurrentDate(addMonths(currentDate, 1))}
      >
        {">"}
      </button>
      <h3>{format(currentDate, "MMMM yyyy")}</h3>
    </div>
  );
}
