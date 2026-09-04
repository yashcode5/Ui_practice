import { useState } from "react";

const users = [
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" },
  { id: 3, name: "Clementine Bauch" },
  { id: 4, name: "Patricia Lebsack" },
  { id: 5, name: "Chelsey Dietrich" }
];

const App = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    setResults(filteredUsers);
  };

  const handleDelete = (id) => {
    setResults((prev) =>
      prev.filter((user) => user.id !== id)
    );
  };

  return (
    <div>
      <h2>Users</h2>

      <input
        type="text"
        placeholder="Search user"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {results.length > 0 ? (
        <ul>
          {results.map((user) => (
            <li key={user.id}>
              {user.name}

              <button onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default App;

