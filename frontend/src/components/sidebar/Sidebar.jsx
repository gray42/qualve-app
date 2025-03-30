import QuestionButton from "./QuestionButton";

export default function Sidebar() {
  return (
    <div className="w-1/4 bg-gray-300 p-4 text-gray-800">
      <h2 className="text-xl font-bold">Sidebar</h2>
      <p className="mt-2">What is on your mind?</p>
      <QuestionButton />

      <ul>
        <li className="mb-2">
          <a href="#link1" className="text-blue-500 hover:underline">
            Link 1
          </a>
        </li>
        <li className="mb-2">
          <a href="#link2" className="text-blue-500 hover:underline">
            Link 2
          </a>
        </li>
        <li className="mb-2">
          <a href="#link3" className="text-blue-500 hover:underline">
            Link 3
          </a>
        </li>
      </ul>
    </div>
  );
}
