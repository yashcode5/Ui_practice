import { useState, useEffect } from "react";
import axios from "axios";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState({
    id: "",
    name: "",
    description: "",
  });

  const [error, setError] = useState("");

  // =========================
  // GET ALL TOPICS
  // =========================
  const getTopics = async () => {
    try {
      setError("");

      const response = await axios.get("http://localhost:8080/topics");

      setTopics(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch topics");
    }
  };

  // =========================
  // GET TOPIC BY ID
  // =========================
  const getTopic = async (id) => {
    try {
      setError("");

      const response = await axios.get(
        `http://localhost:8080/topics/${id}`
      );

      setTopic(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch topic");
    }
  };

  // =========================
  // CREATE TOPIC
  // =========================
  const createTopic = async () => {
    try {
      setError("");

      const response = await axios.post(
        "http://localhost:8080/topics",
        topic
      );

      console.log("Created:", response.data);

      // Refresh list
      await getTopics();

      // Clear form
      setTopic({
        id: "",
        name: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      setError("Failed to create topic");
    }
  };

  // =========================
  // UPDATE TOPIC
  // =========================
  const updateTopic = async () => {
    try {
      setError("");

      const response = await axios.put(
        `http://localhost:8080/topics/${topic.id}`,
        topic
      );

      console.log("Updated:", response.data);

      // Refresh list
      await getTopics();
    } catch (error) {
      console.error(error);
      setError("Failed to update topic");
    }
  };

  // =========================
  // DELETE TOPIC
  // =========================
  const deleteTopic = async (id) => {
    try {
      setError("");

      await axios.delete(
        `http://localhost:8080/topics/${id}`
      );

      console.log("Topic deleted");

      // Refresh list
      await getTopics();
    } catch (error) {
      console.error(error);
      setError("Failed to delete topic");
    }
  };

  // =========================
  // USE EFFECT
  // =========================
  useEffect(() => {
    getTopics();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setTopic({
      ...topic,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Topics</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* FORM */}

      <input
        type="text"
        name="name"
        placeholder="Topic name"
        value={topic.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={topic.description}
        onChange={handleChange}
      />

      <button onClick={createTopic}>
        Create
      </button>

      <button onClick={updateTopic}>
        Update
      </button>

      {/* TOPIC LIST */}

      <h2>All Topics</h2>

      {topics.map((item) => (
        <div key={item.id}>

          <p>
            <strong>{item.name}</strong>
          </p>

          <p>
            {item.description}
          </p>

          <button
            onClick={() => getTopic(item.id)}
          >
            Get
          </button>

          <button
            onClick={() => {
              setTopic(item);
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteTopic(item.id)}
          >
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}

export default Topics;