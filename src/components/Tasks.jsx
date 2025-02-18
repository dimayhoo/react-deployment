import Task from './Task';
import { Link } from 'react-router-dom';

function Tasks({ tasks, deleteTask, switchReminder }) {
    return <>
        {tasks.map((task) => (
            <Task key={task.id} task={task} deleteTask={deleteTask} switchReminder={switchReminder}/>
        ))}
    </>
}

export default Tasks;