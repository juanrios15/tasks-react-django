import { useEffect, useState } from "react";
import { getAllTasks, moveTask } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

export function TasksList() {

    const [tasks, setTasks] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        loadTasks()
    }, [currentPage])

    async function loadTasks() {
        const res = await getAllTasks(currentPage)
        setTasks([...tasks].concat(res.data.results));
        if (!res.data.next) {
            setHasMore(false);
        }
    }

    const handleDragEnd = async (event) => {
        const { active, over } = event
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        const newOrder = arrayMove(tasks, oldIndex, newIndex)
        setTasks(newOrder)
        const ordering = { ordering: tasks[newIndex].ordering }
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
            <div className="w-1/2 h-50">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
                    <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                        <InfiniteScroll
                            dataLength={tasks.length}
                            scrollThreshold="95%"
                            next={() => setCurrentPage(prevPage => prevPage + 1)}
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            {tasks.map(task => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </InfiniteScroll>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    )

}