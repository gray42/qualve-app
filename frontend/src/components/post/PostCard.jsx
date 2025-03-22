import TimeAgo from "../../utils/TimeAgo";

//TODOS: finish up card layout - add individual question view page - home page

// eslint-disable-next-line react/prop-types
export default function PostCard({ title, author, votes, time, answers }) {
  return (
    <div className="m-4 rounded-lg bg-white p-6 drop-shadow-md hover:bg-gray-200">
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
          <button className="flex items-center gap-1 text-blue-500 hover:underline">
            <span>⬆️</span> Vote
          </button>
          <button className="flex items-center gap-1 text-blue-500 hover:underline">
            <span>💬</span> Answers
          </button>
        </div>
        <span>
          {votes} Votes • {answers} Answers
        </span>
      </div>
    </div>
  );
}

{
  /* <div className="flex items-center justify-center first:mt-4">
      <div className="m-2 flex w-1/2 items-center justify-center gap-2 rounded-xl bg-slate-200 p-2 drop-shadow-md">
        <h2>{title}</h2>
        <p>Written By: {author}</p>
        <p>Votes: {votes} </p>
        <p>Time: {time} </p>
      </div>
    </div> */
}
