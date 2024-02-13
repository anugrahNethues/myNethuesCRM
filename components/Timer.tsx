"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { entriesActions } from "@/store/store";

import TaskForm from "./TaskForm";

let interval: ReturnType<typeof setInterval>;

let taskName: string;
let taskCategory: string;

const Timer = () => {
  const dispatch = useAppDispatch();

  const [isStarted, setIsStarted] = useState(false);
  const [date, setDate] = useState<Date | null>();
  const [time, setTime] = useState(0);

  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  const sendFormDetails = (name: string, category: string) => {
    taskName = name;
    taskCategory = category;
  };

  useEffect(() => {
    if (isStarted) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setDate(new Date());
    } else {
      if (date) {
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
          taskName: taskName,
          taskCategory: taskCategory,
          startTime: `${startingHours}:${startingMinutes}`,
          endTime: `${endingHours}:${endingMinutes}`,
          totalTime: `${hours}:${minutes}`,
        };

        //dispatching action to update tasks with a new task
        dispatch(entriesActions.addEntry(newEntry));

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
    setIsStarted(false);
  };

  const handleReset = () => {
    setTime(0);
    setDate(null);
    setIsStarted(false);
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <TaskForm
      onFormSubmit={handleSubmit}
      handleReset={handleReset}
      seconds={seconds}
      hours={hours}
      minutes={minutes}
      sendFormDetails={sendFormDetails}
      onStart={handleStart}
    />
  );
};

export default Timer;
