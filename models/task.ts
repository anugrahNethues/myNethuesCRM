class Task {
  taskName: string;
  taskCategory: string;
  startTime: string;
  endTime: string;
  totalTime: string;

  constructor(
    taskName: string,
    taskCategory: string,
    startTime: string,
    endTime: string,
    totalTime: string
  ) {
    (this.taskName = taskName),
      (this.taskCategory = taskCategory),
      (this.startTime = startTime),
      (this.endTime = endTime),
      (this.totalTime = totalTime);
  }
}

export default Task;
