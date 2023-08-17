import { useEffect, useState } from "react";
import { getAllTasks, moveTask } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

export function TasksList() {

    const [tasks, setTasks] = useState([])
    useEffect(() => {
        async function loadTasks() {
            const res = await getAllTasks()
            setTasks(res.data)
        }
        loadTasks()
    }, [])

    const handleDragEnd = async (event) => {
        const { active, over } = event
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        const newOrder = arrayMove(tasks, oldIndex, newIndex)
        setTasks(newOrder)
        const ordering = {ordering: tasks[newIndex].ordering}
        await moveTask(active.id, ordering)
    }
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    return (
        <div className="flex justify-center items-center">
            <div className="w-4/6">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
                    <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                        {tasks.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    )

}