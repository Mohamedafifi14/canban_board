import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300'
};

const TaskCard = ({ task, onEdit, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const tags = task.tags ? task.tags.split(',').map(t => t.trim()) : [];

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-move"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 flex-1">{task.title}</h3>
                <div className="flex gap-1 ml-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(task);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm p-1"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Delete this task?')) {
                                onDelete(task.id);
                            }
                        }}
                        className="text-red-600 hover:text-red-800 text-sm p-1"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
                <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                    {task.priority}
                </span>
                {task.due_date && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300">
                        📅 {formatDate(task.due_date)}
                    </span>
                )}
            </div>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {tags.map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {task.assignee && (
                <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">👤</span>
                    <span>{task.assignee.name}</span>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
