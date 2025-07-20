"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  DragOverEvent,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Clock, User, MoreHorizontal } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: string;
  dueDate: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
function getStatusColor(status: string) {
  switch (status) {
    case "open":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "in-progress":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
    case "resolved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "closed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    case "reopened":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    case "on-hold":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300";
  }
}

const initialColumns: Column[] = [
  {
    id: "open",
    title: "Open",
    tasks: [
      {
        id: "task-1",
        title: "Setup project repository",
        description: "Initialize Git and set up project structure",
        priority: "high",
        assignee: "Alice Smith",
        dueDate: "2025-07-15",
      },
      {
        id: "task-2",
        title: "Gather requirements",
        description: "Meet client and collect project requirements",
        priority: "medium",
        assignee: "John Doe",
        dueDate: "2025-07-18",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "task-3",
        title: "Design new dashboard",
        description: "Create mockups for new dashboard layout",
        priority: "low",
        assignee: "Mike Johnson",
        dueDate: "2025-07-20",
      },
    ],
  },
  {
    id: "resolved",
    title: "Resolved",
    tasks: [
      {
        id: "task-4",
        title: "Fix login bug",
        description: "Resolve login issue on mobile devices",
        priority: "high",
        assignee: "Jane Williams",
        dueDate: "2025-07-10",
      },
    ],
  },
  {
    id: "closed",
    title: "Closed",
    tasks: [
      {
        id: "task-5",
        title: "Deploy version 1.0",
        description: "Push final release to production server",
        priority: "high",
        assignee: "David Brown",
        dueDate: "2025-07-08",
      },
    ],
  },
  {
    id: "reopened",
    title: "Reopened",
    tasks: [
      {
        id: "task-6",
        title: "Revisit payment issue",
        description: "Customer still reports error when paying via card",
        priority: "medium",
        assignee: "Emily Davis",
        dueDate: "2025-07-19",
      },
    ],
  },
  {
    id: "on-hold",
    title: "On Hold",
    tasks: [
      {
        id: "task-7",
        title: "Third-party API integration",
        description: "Waiting for API keys from vendor",
        priority: "low",
        assignee: "Tom Lee",
        dueDate: "2025-07-25",
      },
    ],
  },
];

function SortableTask({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    transformOrigin: '0 0', // เพิ่ม transform origin
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`transition-all duration-300 ease-out border rounded-sm bg-sidebar ${
        isDragging ? "shadow-2xl" : "hover:shadow-md"
      }`}
    >
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              {...attributes}
              {...listeners}
              className="cursor-move transition-colors" 
            >
              <GripVertical className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-medium">{task.title}</h3>
          </div>
          <div className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${getPriorityColor(
                task.priority
              )}`}
            />
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </div>
        <p className="text-xs mb-2 line-clamp-2">{task.description}</p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {task.assignee}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {task.dueDate}
          </div>
        </div>
      </div>
    </div>
  );
}

function DroppableColumn({ column }: { column: Column }) {
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  return (
      <div className="rounded-[12px] h-fit border">
        <div className="p-2">
          <div className="flex items-center justify-between">
            <Badge className={`font-semibold rounded-sm ${getStatusColor(column.id)}`}>{column.title}</Badge>
            <Badge variant="secondary" className="rounded-sm">{column.tasks.length}</Badge>
          </div>
        </div>
        <div>
          <SortableContext
            items={column.tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <div ref={setNodeRef} className="grid grid-cols-1 gap-2 p-2">
              {column.tasks.map((task) => (
                <SortableTask key={task.id} task={task} />
              ))}
            </div>
          </SortableContext>
        </div>
      </div>
   
  );
}

function TaskOverlay({ task }: { task: Task }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="shadow-2xl border rounded-lg bg-sidebar cursor-move transform transition-all duration-200">
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4" />
            <h3 className="text-sm font-medium">{task.title}</h3>
          </div>
          <div className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${getPriorityColor(
                task.priority
              )}`}
            />
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </div>
        <p className="text-xs mb-2 line-clamp-2">{task.description}</p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {task.assignee}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {task.dueDate}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const findContainer = (id: string) => {
    if (columns.find((col) => col.id === id)) {
      return id;
    }

    return columns.find((col) => col.tasks.find((task) => task.id === id))?.id;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const task = columns
      .flatMap((col) => col.tasks)
      .find((task) => task.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) return;

    setColumns((prev) => {
      const activeIndex = prev.findIndex((col) => col.id === activeContainer);
      const overIndex = prev.findIndex((col) => col.id === overContainer);

      const activeColumn = prev[activeIndex];
      const overColumn = prev[overIndex];

      const activeTask = activeColumn.tasks.find(
        (task) => task.id === activeId
      );
      if (!activeTask) return prev;

      const newColumns = [...prev];

      newColumns[activeIndex] = {
        ...activeColumn,
        tasks: activeColumn.tasks.filter((task) => task.id !== activeId),
      };

      const overTaskIndex = overColumn.tasks.findIndex(
        (task) => task.id === overId
      );
      const insertIndex =
        overTaskIndex >= 0 ? overTaskIndex : overColumn.tasks.length;

      const newOverTasks = [...overColumn.tasks];
      newOverTasks.splice(insertIndex, 0, activeTask);

      newColumns[overIndex] = {
        ...overColumn,
        tasks: newOverTasks,
      };

      return newColumns;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) return;

    // If in the same column, handle reordering
    if (activeContainer === overContainer) {
      setColumns((prev) => {
        const columnIndex = prev.findIndex((col) => col.id === activeContainer);
        const column = prev[columnIndex];

        const activeIndex = column.tasks.findIndex(
          (task) => task.id === activeId
        );
        const overIndex = column.tasks.findIndex((task) => task.id === overId);

        if (activeIndex !== overIndex) {
          const newColumns = [...prev];
          newColumns[columnIndex] = {
            ...column,
            tasks: arrayMove(column.tasks, activeIndex, overIndex),
          };
          return newColumns;
        }

        return prev;
      });
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kanban Board</h2>
          <p>Drag tasks between columns to update their status</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Column
        </Button>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[]} // เพิ่ม modifiers เพื่อปรับแต่ง animation
      >
        <div className="grid grid-cols-6 gap-2">
          {columns.map((column) => (
            <DroppableColumn key={column.id} column={column} />
          ))}
        </div>

        <DragOverlay dropAnimation={{
          duration: 300,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}>
          {activeTask ? <TaskOverlay task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
