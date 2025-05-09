import Tasks from './Tasks';

export default function SelectedProject({
  projectDetails,
  tasks,
  onDelete,
  onAddTask,
  onDeleteTask
}) {
  const formattedDate = new Date(projectDetails.dueDate).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  );
  return (
    <div className='w-[35rem] mt-16'>
      <header className='pb-4 mb-4 border-b-2 border-stone-300'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-stone-600 mb-2'>
            {projectDetails.title}
          </h1>
          <button
            className='text-stone-6 hover:text-stone-950'
            onClick={() => {
              onDelete(projectDetails.id);
            }}
          >
            Delete
          </button>
        </div>
      </header>
      <p className='mb-4 text-stone-400'>{formattedDate}</p>
      <p className='text-stone-600 whitespace-pre-wrap'>
        {projectDetails.description}
      </p>

      <Tasks tasks={tasks} onAdd={onAddTask} onDelete={onDeleteTask} />
    </div>
  );
}
