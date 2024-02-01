"use client";
//By default all react js components (in next js apps) are react server components and are only rendered on the server and does not execute on the browser
//client components: Components that are pre-rendered on the server but then also potentially on the client. These components must be rendered on the client as they contain some code or use some features that are only available on the client

import { useSelector, useDispatch } from "react-redux";
import { entriesActions } from "@/store/index";

import { useState, useEffect } from "react";
import Tasks from "./Tasks";
import { DUMMY_TASK_DATA } from "../DummyTaskData";

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const [time, setTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  // const [taskEntries, setTaskEntries] = useState<Task[]>([]);
  const [date, setDate] = useState<Date>();

  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  let interval: ReturnType<typeof setInterval>;
  // let startingTime = useRef();

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
    //this prevents even pre-rendering on the server, and makes sure your server-rendered content matches the content on initial client load, thus preventing a hydration mismatch. The content will be rendered once the hydration is completed
  }, []);

  useEffect(() => {
    if (isStarted) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setDate(new Date());
    } else {
      if (date) {
        const form = document.querySelector("form") as HTMLFormElement;
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
        const startingHours = date.getHours();
        const startingMinutes = date.getMinutes();
        let endingHours = startingHours + hours;
        let endingMinutes = startingMinutes + minutes;
        let totalHours = startingHours + hours;
        let totalMinutes = startingMinutes + minutes;

        if (totalMinutes >= 60) {
          totalMinutes -= 60;
          totalHours++;
        }

        if (endingMinutes >= 60) {
          endingMinutes -= 60;
          endingHours++;
        }

        const newEntry = {
          id: Math.random() * 1000,
          taskName: data.taskName,
          taskCategory: data.taskCategory,
          startTime: `${startingHours}:${startingMinutes}`,
          endTime: `${endingHours}:${endingMinutes}`,
          totalTime: `${totalHours - startingHours}:${
            totalMinutes - startingMinutes
          }`,
        };

        //dispatching action to update tasks with a new task
        dispatch(entriesActions.addEntry(newEntry));

        // //logic to store tasks in localStorage
        // const taskEntries = localStorage.getItem("taskEntries");
        // const existingTaskEntries =
        //   (taskEntries && JSON.parse(taskEntries)) || [];

        // localStorage.setItem(
        //   "taskEntries",
        //   JSON.stringify([newEntry, ...existingTaskEntries])
        // );

        // setTaskEntries((prevEntries) => {

        //   const newEntry = {
        //     id: Math.random() * 1000,
        //     taskName: data.taskName,
        //     taskCategory: data.taskCategory,
        //     startTime: `${startingHours}:${startingMinutes}`,
        //     endTime: `${endingHours}:${endingMinutes}`,
        //     totalTime: `${totalHours - startingHours}:${
        //       totalMinutes - startingMinutes
        //     }`,
        //   };

        //   console.log(newEntry);
        //   const updatedEntries = [...prevEntries, newEntry];
        //   return updatedEntries;
        // });

        form.reset();
        setTime(0);
        // console.log(taskEntries);
      }
    }
    //cleanup function
    return () => {
      clearInterval(interval);
    };
  }, [isStarted]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isStarted) {
      // clearInterval(interval);
      setIsStarted(false);
    } else {
      setIsStarted(true);
    }
  };

  const handleReset = () => {
    setTime(0);
  };

  return (
    <>
      <main>
        <h1 className="font-bold text-center m-4 text-blue-500">
          Nethues CRM Tracker
        </h1>
        {/* <form onSubmit={handleSubmit}> */}
        <div className="p-4 border-2 border-gray-300 mx-4 my-2">
          <form onSubmit={handleSubmit} className="flex justify-between">
            <input
              name="taskName"
              type="text"
              placeholder="What are you working on?"
              required
              className="border-2 border-grey-800 basis-1/2"
            />
            {/* <label htmlFor="task-options"></label> */}
            <select name="taskCategory" id="task-options">
              {DUMMY_TASK_DATA.map((task) => (
                <option value={task.taskName} key={task.taskName}>
                  {task.taskName}
                </option>
              ))}
              {/* <option value="task1">Task 1</option>
            <option value="task2">Task 2</option>
            <option value="task3">Task 3</option>
            <option value="task4">Task 4</option> */}
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
      {/* {taskEntries.length > 0 && <Tasks tasks={taskEntries} />} */}
      {tasks.length > 0 && isHydrated && <Tasks />}
    </>
  );
};

export default TaskForm;
