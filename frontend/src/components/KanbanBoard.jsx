import { useState, useEffect } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import Column from './Column';
import TaskCard from './TaskCard';
import {
    fetchTasks,
    fetchUsers,
    updateTaskStatus,
    deleteTask,
} from '../services/api';

const KanbanBoard = ({ onEditTask, onCreateTask }) => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTask, setActiveTask] = useState(null);
    const [loading, setLoading] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [tasksData, usersData] = await Promise.all([
                fetchTasks(),
                fetchUsers(),
            ]);
            console.log('Loaded tasks from API:', tasksData.length, tasksData);
            console.log('Loaded users from API:', usersData.length, usersData);
            setTasks(tasksData);
            setUsers(usersData);
        } catch (error) {
            console.error('Error loading data:', error);
            alert('Failed to load data. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    const getTasksByStatus = (status) => {
        const filtered = tasks.filter((task) => task.status === status);
        console.log(`Tasks for ${status}:`, filtered.length, filtered.map(t => t.id));
        return filtered;
    };

    const handleDragStart = (event) => {
        const { active } = event;
        const task = tasks.find((t) => t.id === active.id);
        setActiveTask(task);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const taskId = active.id;

        // Determine the new status - if dropping on a task, find its column; if on a column, use the column id
        let newStatus = over.id;

        // Check if we dropped on a task (numeric id) instead of a column (string status)
        const targetTask = tasks.find((t) => t.id === over.id);
        if (targetTask) {
            // Dropped on another task, use that task's status
            newStatus = targetTask.status;
        }

        const task = tasks.find((t) => t.id === taskId);
        if (!task || task.status === newStatus) return;

        const oldStatus = task.status;

        console.log('Moving task:', taskId, 'from', oldStatus, 'to', newStatus);

        // Optimistic update - create a new object to ensure React detects the change
        setTasks((prevTasks) =>
            prevTasks.map((t) =>
                t.id === taskId ? { ...t, status: newStatus } : t
            )
        );

        try {
            const updatedTask = await updateTaskStatus(taskId, newStatus);
            console.log('Task updated from server:', updatedTask);
            // Update with server response to ensure consistency
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
            );
        } catch (error) {
            console.error('Error updating task status:', error);
            // Revert on error
            setTasks((prevTasks) =>
                prevTasks.map((t) =>
                    t.id === taskId ? { ...t, status: oldStatus } : t
                )
            );
            alert('Failed to update task status');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task');
        }
    };

    const handleTaskUpdate = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
    };

    const handleTaskCreate = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Kanban Board</h1>
                <button
                    onClick={onCreateTask}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                    + New Task
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-4 overflow-x-auto pb-4">
                    <Column
                        status="todo"
                        tasks={getTasksByStatus('todo')}
                        onEditTask={onEditTask}
                        onDeleteTask={handleDeleteTask}
                    />
                    <Column
                        status="in_progress"
                        tasks={getTasksByStatus('in_progress')}
                        onEditTask={onEditTask}
                        onDeleteTask={handleDeleteTask}
                    />
                    <Column
                        status="done"
                        tasks={getTasksByStatus('done')}
                        onEditTask={onEditTask}
                        onDeleteTask={handleDeleteTask}
                    />
                </div>

                <DragOverlay>
                    {activeTask ? (
                        <div className="rotate-3">
                            <TaskCard task={activeTask} onEdit={() => { }} onDelete={() => { }} />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

export default KanbanBoard;
