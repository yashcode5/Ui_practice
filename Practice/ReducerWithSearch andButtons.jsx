
import axios from "axios";
import { useEffect, useReducer, useState } from "react";

const initialState = {
  data: [],
  loading: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const fetchUsers = async () => {
    dispatch({ type: "FETCH_START" });

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      dispatch({
        type: "FETCH_SUCCESS",
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        error: "Failed to fetch users"
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filtered = state.data.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    setResults(filtered);
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

      {state.loading && <p>Loading...</p>}

      {state.error && <p>{state.error}</p>}

      
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

    </div>
  );
};

export default App;
