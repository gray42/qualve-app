export default function Sidebar() {
  return (
    <div className="bg-gray-100 p-4">
      <h2 className="mb-4 text-xl font-bold">Sidebar</h2>
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
