function SearchBar({ search, status, onSearchChange, onStatusChange }) {
  return (
    <div className="toolbar">
      <label className="field search-field">
        <span>Search</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Name, email, ticket ID, or description"
        />
      </label>

      <label className="field status-field">
        <span>Status</span>
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="">All statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
