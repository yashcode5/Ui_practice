import { useState } from "react";
import axios from "axios";
import "../App.css";

function AddTopic({ onClose, onSuccess }) {
  const [topic, setTopic] = useState({
    id: "",
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setTopic({
      ...topic,
      [e.target.name]: e.target.value,
    });
  };

  const addTopic = async () => {
    const payload = {
      id: topic.id.trim(),
      name: topic.name.trim(),
      description: topic.description.trim(),
    };

    if (!payload.id || !payload.name || !payload.description) {
      alert("Please enter an ID, name, and description for the topic.");
      return;
    }

    try {
      const requestBody = [payload];
      console.log("AddTopic request body:", requestBody);

      await axios.post("http://localhost:8080/topics", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Topic Added Successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error.response);
  console.log(error.response?.status);
  console.log(error.response?.data);

  alert(JSON.stringify(error.response?.data, null, 2));
      console.error(error.response?.data || error.message || error);
      const serverMessage =
        error.response?.data?.message ||
        error.response?.statusText ||
        "Bad Request";
      alert(`Failed to add topic: ${serverMessage}`);
    }
  };

  return (
    <div className="modal-card">
      <div className="modal-header">
        <h2>Add Topic</h2>
        <button className="cancel-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <input
        type="text"
        name="id"
        placeholder="Enter ID"
        value={topic.id}
        onChange={handleChange}
      />

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={topic.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        placeholder="Enter Description"
        value={topic.description}
        onChange={handleChange}
      />

      <div className="modal-actions">
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
        <button className="add-btn" onClick={addTopic}>
          Add Topic
        </button>
      </div>
    </div>
  );
}

export default AddTopic;