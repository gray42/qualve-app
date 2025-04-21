import TimeAgo from "../../utils/TimeAgo";

//TODOS: finish up card layout - add individual question view page - home page

// eslint-disable-next-line react/prop-types
export default function PostCard({
  tags,
  title,
  author,
  upvotes,
  downvotes,
  time,
  answers,
}) {
  return (
    <div className="m-4 rounded-lg border border-gray-200 bg-white p-6 drop-shadow-md hover:bg-gray-300">
      {/* Post Header */}
      <div className="flex items-center gap-4">
        {/* may not need profile icon*/}

        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm text-gray-500">
            Posted <TimeAgo createdAt={time} /> by {author}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-4">
        <p className="text-gray-700">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Lorem id faucibus
          tempus; nibh vestibulum duis justo. Habitant nisi est ad consequat
          ornare ut conubia eleifend. Etiam congue pellentesque vivamus
          fermentum lacinia.
        </p>
      </div>

      {/* Post Footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          {/*tags*/}
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <span>
          {upvotes === 1 ? `${upvotes} Upvote` : `${upvotes} Upvotes`} •{" "}
          {downvotes === 1 ? `${downvotes} Downvote` : `${downvotes} Downvotes`}{" "}
          • {answers === 1 ? `${answers} Answer` : `${answers} Answers`}
        </span>
      </div>
    </div>
  );
}
