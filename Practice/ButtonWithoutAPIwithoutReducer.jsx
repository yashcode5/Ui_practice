import { useState } from "react"

const App = () => {
  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const [users, setUsers] = useState([
    { id: "1", name: "Yash Sinha" },
    { id: "2", name: "Mamli Sinha" },
    { id: "3", name: "Suranjita Das" }
  ])

  const handleUsers = () => {

    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    )
    setResult(filteredUsers)
    setHasSearched(true)
  }

  const handleDelete = (id) => {
    setResult((prev) =>
      prev.filter((user) => user.id !== id)
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <input
        type="text"
        value={search}
        placeholder="Search user"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleUsers}>
        Search
      </button>
      {hasSearched && (
        result.length > 0 ? (
          <ul>
            {result.map((user) => (
              <li key={user.id}>
                {user.name}
                <button onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found!!!</p>
        )
      )}
    </div>
  )
}

export default App
