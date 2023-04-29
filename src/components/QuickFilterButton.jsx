import '../css/quickfilter.css';
const QuickFilterButton = ({ filterOption, onButtonClick, toggledFilters }) => {
  const isActive = toggledFilters.includes(filterOption);
  return (
    <button
      type="button"
      className={`oval-quick-filter-button ${isActive ? 'quickfilter-active' : ''}`}
      onClick={() => onButtonClick(filterOption)}
    >
      {filterOption}
    </button>
  );
};

export default QuickFilterButton;
