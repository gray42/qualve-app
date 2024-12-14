// eslint-disable-next-line react/prop-types
export default function QuestionCard({ title, author, views, time }) {
  return (
    <div className="m-2 flex items-center gap-2 rounded-xl bg-slate-200 p-2 drop-shadow-md">
      <h2>{title}</h2>
      <p>Written By: {author}</p>
      <p>Views: {views} </p>
      <p>Time: {time} </p>
    </div>
  );
}
