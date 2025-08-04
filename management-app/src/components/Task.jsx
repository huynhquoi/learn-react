import NewTask from "./NewTask";

export default function Task({ tasks, onAdd, onDelete }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">TASK</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project don't have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-stone-600">
                    {task.title}
                  </h3>
                  <p className="text-stone-500">{task.description}</p>
                </div>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
