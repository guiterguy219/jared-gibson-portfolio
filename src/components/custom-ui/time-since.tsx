import { formatDistanceToNow } from "date-fns";

export default function TimeSince({ date }: { date: string }) {
  return (
    <>
      {formatDistanceToNow(date, {
        addSuffix: true,
      })}
    </>
  );
}
