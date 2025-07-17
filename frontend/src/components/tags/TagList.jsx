import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function TagList({ tags }) {
  const { user } = useUser();

  return (
    <>
      <div className="w-full">
        <div className="p-4">
          {tags.map((tag, idx) => (
            <div key={idx} className="">
              <Link
                to={`/tags/${tag.name}`}
                className="text-blue-600 hover:underline"
              >
                {tag.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
