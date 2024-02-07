"use client";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/store/hooks";
import { entriesActions } from "@/store/store";

import TaskForm from "./TaskForm";

let interval: ReturnType<typeof setInterval>;

const Timer: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isStarted, setIsStarted] = useState(false);
  const [date, setDate] = useState<Date | null>();
  const [time, setTime] = useState(0);

  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

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
          totalTime: `${hours}:${minutes}`,
        };

        //dispatching action to update tasks with a new task
        dispatch(entriesActions.addEntry(newEntry));

        form.reset();
        setTime(0);
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
      setIsStarted(false);
    } else {
      setIsStarted(true);
    }
  };

  const handleReset = () => {
    setTime(0);
    // clearInterval(interval);
    setDate(null);
    setIsStarted(false);
  };

  return (
    <TaskForm
      isStarted={isStarted}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      seconds={seconds}
      hours={hours}
      minutes={minutes}
    />
  );
};

export default Timer;
