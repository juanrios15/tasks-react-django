import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


export function TaskCard({ task }) {
    const navigate = useNavigate()
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: isDragging ? 'grabbing' : 'grab'
    }
    
    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer my-3"
            onClick={() => {
                navigate(`/task/${task.id}`) }}
        >
            <h1 className="font-bold uppercase">{task.title}</h1>
            <p className="text-slate-400">{task.description}</p>
        </div>
    )
}
