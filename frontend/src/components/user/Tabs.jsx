const Tabs = ({ activeTab, onTabChange, tabs }) => (
  <div className="mb-4 flex gap-4 border-b">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`pb-2 ${activeTab === tab ? "border-b-2 border-blue-500" : ""}`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
);

export default Tabs;
