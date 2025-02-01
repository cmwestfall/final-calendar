import { format } from "date-fns";

type ViewMoreProps = {
  date: Date;
  onClose: () => void;
  events: Event[];
};

export function ViewMoreModal({ date, onClose, events }: ViewMoreProps) {
  return (
    <>
      <div className="modal">
        <div className="modal-header">{format(date, "m/d/yy")}</div>
      </div>
    </>
  );
}
