import { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import { getUsers, createTask, updateTask } from './services/api';
import './App.css';

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [users, setUsers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCreateTask = () => {
    setIsCreating(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      setEditingTask(null);
      setIsCreating(false);
      setRefreshKey(prev => prev + 1); // Trigger refresh
    } catch (error) {
      console.error('Failed to save task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <KanbanBoard
        key={refreshKey}
        onEditTask={handleEditTask}
        onCreateTask={handleCreateTask}
      />

      {(isCreating || editingTask) && (
        <TaskModal
          task={editingTask}
          users={users}
          onSave={handleSaveTask}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
