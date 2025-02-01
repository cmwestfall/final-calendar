import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type CurrentDateContext = {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
};

const CurrentDateContext = createContext<CurrentDateContext | undefined>(
  undefined
);

export function CurrentDateProvider({ children }: { children: ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <CurrentDateContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </CurrentDateContext.Provider>
  );
}

export const useCurrentDateContext = () => {
  const context = useContext(CurrentDateContext);

  if (!context) {
    throw new Error(
      "useCurrentDateContext must be used within <CurrentDateProvider>"
    );
  }
  return context;
};
