import { useEffect, useReducer } from "react";
import axios from "axios";
import "../App.css";


const topicReducer=(state,action)=>{
  switch(action.type){
    case "SET_TOPIC":
      return action.payload;
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}

function UpdateTopic({ topicToEdit, onClose, onSuccess }) {
  const [topic, dispatch] = useReducer(topicReducer, {
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    if (topicToEdit) {
      dispatch({ type: "SET_TOPIC", payload: topicToEdit });
    }
  }, [topicToEdit]);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const updateTopic = async () => {
    try {
      await axios.put(`http://localhost:8080/topics/${topic.id}`, topic);

      alert("Topic Updated Successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update topic.");
    }
  };

  return (
    <div className="modal-card">
      <div className="modal-header">
        <h2>Update Topic</h2>
        <button className="cancel-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <input type="text" name="id" value={topic.id} readOnly />

      <input
        type="text"
        name="name"
        value={topic.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        value={topic.description}
        onChange={handleChange}
      />

      <div className="modal-actions">
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
        <button className="form-btn" onClick={updateTopic}>
          Update Topic
        </button>
      </div>
    </div>
  );
}

export default UpdateTopic;