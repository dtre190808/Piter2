function Filter({ onFilterChange }) {
    return (
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="name">По названию</option>
        <option value="location">По локации</option>
      </select>
    );
  }
  
  export default Filter;