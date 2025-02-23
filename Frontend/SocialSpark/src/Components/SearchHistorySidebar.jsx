import React from 'react';

export default function SearchHistorySidebar({ history, onSelect, onClearAll, onDelete }) {
  return (
    <div className="w-64 h-full fixed left-0 top-0 bg-white/10 backdrop-blur-lg text-white p-4 rounded-r-3xl shadow-lg flex flex-col">
      <h2 className="text-xl font-bold mb-4">Search History</h2>

      {/* Clear All Button */}
      <button
        onClick={onClearAll}
        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg mb-4 transition-all"
      >
        Clear All
      </button>

      {history.length === 0 ? (
        <p className="text-sm">No search history yet.</p>
      ) : (
        <ul className="space-y-2 overflow-y-auto max-h-[80vh]">
          {history.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <span onClick={() => onSelect(item)} className="flex-1">{item}</span>
              <button
                onClick={() => onDelete(item)}
                className="ml-2 text-red-400 hover:text-red-300 transition-all"
                title="Delete"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
