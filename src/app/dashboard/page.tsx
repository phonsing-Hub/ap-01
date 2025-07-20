"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ChartRadarMultiple } from "@/components/chart/RadarChart";
import {
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  Plus,
  TrendingUp,
  Users,
  Target,
  Activity,
  Bell,
} from "lucide-react";

// Mock data
const stats = [
  {
    title: "Total Tasks",
    value: "24",
    change: "+12%",
    icon: Target,
    description: "From last month",
  },
  {
    title: "Completed",
    value: "18",
    change: "+8%",
    icon: CheckCircle,
    description: "75% completion rate",
  },
  {
    title: "In Progress",
    value: "6",
    change: "-2%",
    icon: Clock,
    description: "Currently working on",
  },
  {
    title: "Team Members",
    value: "8",
    change: "+1",
    icon: Users,
    description: "Active collaborators",
  },
];

const recentTasks = [
  {
    id: 1,
    title: "Design new landing page",
    status: "in-progress",
    priority: "high",
    assignee: "John Doe",
    dueDate: "2024-01-15",
    progress: 75,
  },
  {
    id: 2,
    title: "Implement user authentication",
    status: "completed",
    priority: "high",
    assignee: "Jane Smith",
    dueDate: "2024-01-10",
    progress: 100,
  },
  {
    id: 3,
    title: "Write API documentation",
    status: "todo",
    priority: "medium",
    assignee: "Mike Johnson",
    dueDate: "2024-01-20",
    progress: 0,
  },
  {
    id: 4,
    title: "Setup CI/CD pipeline",
    status: "in-progress",
    priority: "high",
    assignee: "Sarah Wilson",
    dueDate: "2024-01-18",
    progress: 45,
  },
];

const performanceData = [
  {
    name: "Productivity",
    value: 85,
  },
  {
    name: "Efficiency",
    value: 78,
  },
  {
    name: "Quality",
    value: 92,
  },
  {
    name: "Collaboration",
    value: 88,
  },
  {
    name: "Innovation",
    value: 75,
  },
  {
    name: "Communication",
    value: 90,
  },
];

const chartConfig = {
  productivity: {
    label: "Productivity",
    theme: {
      light: "hsl(222.2 84% 4.9%)",
      dark: "hsl(210 40% 98%)",
    },
  },
  efficiency: {
    label: "Efficiency",
    theme: {
      light: "hsl(222.2 84% 4.9%)",
      dark: "hsl(210 40% 98%)",
    },
  },
  quality: {
    label: "Quality",
    theme: {
      light: "hsl(222.2 84% 4.9%)",
      dark: "hsl(210 40% 98%)",
    },
  },
  collaboration: {
    label: "Collaboration",
    theme: {
      light: "hsl(222.2 84% 4.9%)",
      dark: "hsl(210 40% 98%)",
    },
  },
  innovation: {
    label: "Innovation",
    theme: {
      light: "hsl(222.2 84% 4.9%)",
      dark: "hsl(210 40% 98%)",
    },
  },
  communication: {
    label: "Communication",
    theme: {
      light: "hsl(222.2 84% 4.9%)",
      dark: "hsl(210 40% 98%)",
    },
  },
};

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "todo":
      return <Circle className="h-4 w-4 text-gray-400" />;
    default:
      return <Circle className="h-4 w-4 text-gray-400" />;
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "in-progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "todo":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Tasks */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>
              You have{" "}
              {recentTasks.filter((task) => task.status === "todo").length}{" "}
              tasks pending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {task.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="secondary"
                          className={getPriorityColor(task.priority)}
                        >
                          {task.priority}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getStatusColor(task.status)}
                        >
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={`/avatars/${task.assignee
                          .toLowerCase()
                          .replace(" ", "")}.jpg`}
                      />
                      <AvatarFallback>
                        {task.assignee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {task.assignee}
                    </span>
                  </div>
                  <div className="flex-1">
                    <Progress value={task.progress} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <Calendar className="inline h-3 w-3 mr-1" />
                    {task.dueDate}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Radar Chart */}
        <ChartRadarMultiple />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Create Task
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Invite Team
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Activity className="h-6 w-6 mb-2" />
              View Reports
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Bell className="h-6 w-6 mb-2" />
              Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
