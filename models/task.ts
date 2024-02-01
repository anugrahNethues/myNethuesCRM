class Task {
  taskName: FormDataEntryValue;
  taskCategory: FormDataEntryValue;
  startTime: string;
  endTime: string;
  totalTime: string;

  constructor(
    taskName: FormDataEntryValue,
    taskCategory: FormDataEntryValue,
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
