import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const columnConfig = {
    todo: { title: 'To Do', color: 'bg-gray-100' },
    in_progress: { title: 'In Progress', color: 'bg-blue-100' },
    done: { title: 'Done', color: 'bg-green-100' }
};

const Column = ({ status, tasks, onEditTask, onDeleteTask }) => {
    const { setNodeRef } = useDroppable({ id: status });
    const config = columnConfig[status];
    const taskIds = tasks.map(task => task.id);

    return (
        <div className="flex-1 min-w-[300px]">
            <div className={`${config.color} p-3 rounded-t-lg border-b-2 border-gray-300`}>
                <h2 className="font-bold text-lg text-gray-800">
                    {config.title}
                    <span className="ml-2 text-sm font-normal text-gray-600">({tasks.length})</span>
                </h2>
            </div>
            <div
                ref={setNodeRef}
                className="bg-gray-50 p-3 rounded-b-lg min-h-[500px] space-y-3"
            >
                <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={`${task.id}-${task.status}`}
                            task={task}
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                        />
                    ))}
                </SortableContext>
                {tasks.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                        No tasks
                    </div>
                )}
            </div>
        </div>
    );
};

export default Column;
