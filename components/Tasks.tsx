// import Task from "@/models/task";
//react-redux package allows our react application to connect with the redux store
import { useAppSelector } from "@/store/hooks";
import { task } from "@/store/store";

const Tasks = () => {
  const tasks = useAppSelector((state) => state.tasks);
  return (
    <div className="border-2 border-b-0 border-gray-300 mx-4 my-10">
      {tasks.map((task: task) => (
        <div
          key={task.id}
          className="flex justify-between p-4 border-b-2 border-b-gray-300"
        >
          <div className="basis-1/3">{task.taskName}</div>
          <div className="basis-1/6 pl-4">{task.taskCategory}</div>
          <div className="basis-1/6 text-center">{task.startTime}</div>
          <div className="basis-1/6 text-center">{task.endTime}</div>
          <div className="basis-1/6 text-center">{task.totalTime}</div>
        </div>
      ))}
    </div>

    // <table>
    //   <tbody>
    //     <div className="border-grey-500">
    //       {tasks.map((task) => (
    //         <tr key={task.id}>
    //           <td className="border-grey-500">{task.taskName}</td>
    //           <td>{task.taskCategory}</td>
    //           <td>{task.startTime}</td>
    //           <td>{task.endTime}</td>
    //           <td>{task.totalTime}</td>
    //         </tr>
    //       ))}
    //     </div>
    //   </tbody>
    // </table>
  );
};

export default Tasks;
