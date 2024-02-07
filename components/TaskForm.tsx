"use client";
//By default all react js components (in next js apps) are react server components and are only rendered on the server and does not execute on the browser
//client components: Components that are pre-rendered on the server but then also potentially on the client. These components must be rendered on the client as they contain some code or use some features that are only available on the client

import { useAppSelector } from "@/store/hooks";
import { useState, useEffect } from "react";

import Tasks from "./Tasks";
import { DUMMY_TASK_DATA } from "../DummyTaskData";

type TaskFormProps = {
  isStarted: boolean;
  handleReset: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function TaskForm({
  isStarted,
  handleReset,
  handleSubmit,
  hours,
  minutes,
  seconds,
}: TaskFormProps) {
  const tasks = useAppSelector((state) => state.tasks);

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
    //this prevents even pre-rendering on the server, and makes sure your server-rendered content matches the content on initial client load, thus preventing a hydration mismatch. The content will be rendered once the hydration is completed
  }, []);

  return (
    <>
      <main>
        <h1 className="font-bold text-center m-4 text-blue-500">
          Nethues CRM Tracker
        </h1>
        <div className="p-4 border-2 border-gray-300 mx-4 my-2">
          <form onSubmit={handleSubmit} className="flex justify-between">
            <input
              name="taskName"
              type="text"
              placeholder="What are you working on?"
              required
              className="border-2 border-grey-800 basis-1/2"
            />
            <select name="taskCategory" id="task-options">
              {DUMMY_TASK_DATA.map((task) => (
                <option value={task.taskName} key={task.taskName}>
                  {task.taskName}
                </option>
              ))}
            </select>
            <p>
              <span>{hours < 10 ? "0" + hours : hours}</span>:
              <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
              <span>{seconds < 10 ? "0" + seconds : seconds}</span>
            </p>
            <button className="bg-cyan-400 px-5 py-1 text-white text-sm font-bold">
              {isStarted ? "STOP" : "START"}
            </button>
            <button type="reset" onClick={handleReset}>
              Close
            </button>
          </form>
        </div>
      </main>
      {/* this is to prevent hydration mismatch, as tasks will not be rendered on the server as the server will receive an empty tasks array and the task array will be populated on the client side causing a hydration error */}
      {tasks.length > 0 && isHydrated && <Tasks />}
    </>
  );
}
