export default function QuestionCard(post) {
  const { title } = post;
  return (
    <div className="flex items-center justify-between">
      <h2>{title}</h2>
    </div>
  );
}
