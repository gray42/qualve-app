import { formatDistanceToNow } from "date-fns";

// eslint-disable-next-line react/prop-types
export default function TimeAgo({ createdAt }) {
  return (
    <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
  );
}
