import { useState } from "react";
import TopicList from "./components/TopicList";
import AddTopic from "./components/AddTopic";
import UpdateTopic from "./components/UpdateTopic";
import DeleteTopic from "./components/DeleteTopic";

function Layout() {
  const [refresh, setRefresh] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const reloadTopics = () => {
    setRefresh((value) => !value);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedTopic(null);
  };

  const openAddModal = () => {
    setActiveModal("add");
    setSelectedTopic(null);
  };

  const openEditModal = (topic) => {
    setSelectedTopic(topic);
    setActiveModal("edit");
  };

  const openDeleteModal = (topic) => {
    setSelectedTopic(topic);
    setActiveModal("delete");
  };

  return (
    <>
      <TopicList
        refresh={refresh}
        onAddClick={openAddModal}
        onEditClick={openEditModal}
        onDeleteClick={openDeleteModal}
      />

      {activeModal === "add" && (
        <div className="modal-backdrop">
          <AddTopic onClose={closeModal} onSuccess={reloadTopics} />
        </div>
      )}

      {activeModal === "edit" && selectedTopic && (
        <div className="modal-backdrop">
          <UpdateTopic
            topicToEdit={selectedTopic}
            onClose={closeModal}
            onSuccess={reloadTopics}
          />
        </div>
      )}

      {activeModal === "delete" && selectedTopic && (
        <div className="modal-backdrop">
          <DeleteTopic
            topicToDelete={selectedTopic}
            onClose={closeModal}
            onSuccess={reloadTopics}
          />
        </div>
      )}
    </>
  );
}

export default Layout;