export default function Searchbar() {
  return (
    <div className="relative ml-auto">
      <input
        type="text"
        placeholder="Search"
        className="justify-left mr-4 flex rounded-full border border-black border-opacity-30 px-4 py-1 focus:outline-none"
      />
    </div>
  );
}
