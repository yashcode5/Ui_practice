import { useReducer, useState } from "react";

const users = [
    { id: 1, name: "Yash" },
    { id: 2, name: "Rahul" },
    { id: 3, name: "Amit" },
    { id: 4, name: "Priya" },
    { id: 5, name: "Neha" }
];

const initialState = {
    data: users,
    error: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_SUCCESS":
            return {
                ...state,
                data: action.data,
                error: null
            };

        case "SEARCH_ERROR":
            return {
                ...state,
                data: [],
                error: action.data
            };

        default:
            return state;
    }
};

const Users = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState("");

    const searchUsers = () => {
        const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );

        if (filteredUsers.length === 0) {
            dispatch({
                type: "SEARCH_ERROR",
                data: "User not found"
            });
        } else {
            dispatch({
                type: "SEARCH_SUCCESS",
                data: filteredUsers
            });
        }
    };

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user"
            />

            <button onClick={searchUsers}>
                Search
            </button>

            {state.error && <p>{state.error}</p>}

            <ul>
                {state.data.map((user) => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;