import { useParams } from "react-router-dom";

export function Message() {
  const { id } = useParams();
  return <div className="border border-red-400">single message id: {id}</div>;
}
