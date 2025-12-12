import { format, formatDistanceToNow } from "date-fns";

export default function TimeSince({ date }: { date: string }) {
  return (
    <time dateTime={date} title={format(date, "PPpp")}>
      {formatDistanceToNow(date, {
        addSuffix: true,
      })}
    </time>
  );
}
