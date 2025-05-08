import React from 'react';

const TabButton = React.memo(({ t, active, onClick }) => (
  <button
    key={t.key}
    className={`px-5 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none cursor-pointer ${active ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
    onClick={onClick}
    type="button"
  >
    {t.label}
  </button>
));

export default TabButton;
