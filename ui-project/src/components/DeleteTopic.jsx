import axios from "axios";
import "../App.css";

function DeleteTopic({ topicToDelete, onClose, onSuccess }) {
  const deleteTopic = async () => {
    try {
      await axios.delete(`http://localhost:8080/topics/${topicToDelete.id}`);
      alert("Topic Deleted Successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to delete topic.");
    }
  };

  return (
    <div className="modal-card">
      <div className="modal-header">
        <h2>Delete Topic</h2>
        <button className="cancel-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <p>
        Are you sure you want to delete <strong>{topicToDelete?.name}</strong>?
      </p>

      <div className="modal-actions">
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
        <button className="delete-btn" onClick={deleteTopic}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteTopic;