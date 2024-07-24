import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import About from './components/About.jsx';
import Tasks from './components/Tasks.jsx';
import AddTask from './components/AddTask.jsx';
import useFetch from './hooks/useFetch.jsx';
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

export default function App() {
  const [showAddTask, setShowAddTask] = useState(0);
  const { data: tasks, setData: setTasks, isPending, error } = useFetch('http://localhost:5000/api');

  async function makeRequest(type, data) {
    await fetch('http://localhost:5000/api', {
      method: type,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {return result})
    .catch(err => console.log(err));
  }

  const deleteTask = (id) => {
    makeRequest('DELETE', {'id': id});
    setTasks(tasks.filter(task => task.id !== id));
  }

  const switchReminder = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.reminder = !task.reminder;
        makeRequest('PUT', {'id': id, 'reminder': task.reminder});
      }
      return task
    }))
  }

  const addTask = (task) => {
    makeRequest('POST', {'task': task});
    setTasks([task, ...tasks])
  }

  // qq How to create router in react? How to implement creating a route? What is the html we can put inside route? What to do with reloading on links?
  return <Router>
    <div>
      <Header onAdd={() => {setShowAddTask((showAddTask + 1) % 2)}} showAdd={showAddTask} />
      <Routes>
        <Route path="/" exact element={
          <>
            {showAddTask === 1 && <AddTask addTask={addTask} />}
            {error && <div>{error}</div>}
            {
              isPending ? <div>Loading...</div> : (
                <section>
                  {!error && (tasks.length ? <Tasks tasks={tasks} deleteTask={deleteTask} switchReminder={switchReminder}/> : "Congratulations for great work!")}
                </section>
              )
            }
            <Footer />
          </>
        } />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  </Router>
}