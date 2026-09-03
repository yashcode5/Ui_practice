import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function TopicList({ refresh, onAddClick, onEditClick, onDeleteClick }) {
  const [topics, setTopics] = useState([]);

  const getTopics = async () => {
    try {
      const response = await axios.get("http://localhost:8080/topics");
      setTopics(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const seedTopics = async () => {
    const existingTopics = await getTopics();

    if (existingTopics.length >= 100) {
      setTopics(existingTopics);
      return;
    }

    const nextId = existingTopics.reduce((max, topic) => {
      const numericId = Number(topic.id);
      return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
    }, 0);

    const topicsToCreate = [];

    for (let index = 0; index < 100 - existingTopics.length; index += 1) {
      const id = nextId + index + 1;
      topicsToCreate.push({
        id,
        name: `Topic ${id}`,
        description: `This is sample content for Topic ${id}.`,
      });
    }

    for (const topic of topicsToCreate) {
      try {
        await axios.post("http://localhost:8080/topics", [topic]);
      } catch (error) {
        console.error(error);
      }
    }

    const refreshedTopics = await getTopics();
    setTopics(refreshedTopics);
  };

  useEffect(() => {
    seedTopics();
  }, [refresh]);

  return (
    <div className="container">
      <h2>Topics</h2>

      <button className="add-btn" onClick={onAddClick}>
        Add Topic
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Topic</th>
            <th>Description</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {topics.length === 0 ? (
            <tr>
              <td colSpan="5">No Topics Found</td>
            </tr>
          ) : (
            topics.map((topic) => (
              <tr key={topic.id}>
                <td>{topic.id}</td>
                <td>{topic.name}</td>
                <td>{topic.description}</td>

                <td>
                  <button className="edit-btn" onClick={() => onEditClick(topic)}>
                    Edit
                  </button>
                </td>

                <td>
                  <button className="delete-btn" onClick={() => onDeleteClick(topic)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TopicList;