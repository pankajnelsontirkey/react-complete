import { useState } from 'react';

import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import SelectedProject from './components/SelectedProject';

function App() {
  const [projects, setProjects] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  const handleAddProject = () => {
    setProjects((prev) => ({ ...prev, selectedProjectId: null }));
  };

  const handleCreateProject = (projectData) => {
    setProjects((prev) => {
      const newProject = { ...projectData, id: Math.random() };
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject]
      };
    });
  };

  const handleCancelAddProject = () => {
    return setProjects((prev) => ({
      ...prev,
      selectedProjectId: undefined
    }));
  };

  const handleSelectProject = (id) => {
    return setProjects((prev) => ({
      ...prev,
      selectedProjectId: id
    }));
  };

  const handleDeleteProject = (id) => {
    return setProjects((prev) => ({
      ...prev,
      selectedProjectId: undefined,
      projects: prev.projects.filter((project) => project.id !== id)
    }));
  };

  const handleAddTask = (text) => {
    setProjects((prev) => {
      const taskId = Math.random();
      const newTask = { text, taskId, projectId: prev.selectedProjectId };

      return { ...prev, tasks: [...prev.tasks, newTask] };
    });
  };

  const handleDeleteTask = (taskId) => {
    setProjects((prev) => {
      return {
        ...prev,
        tasks: prev.tasks.filter((task) => task.taskId !== taskId)
      };
    });
  };

  let content = '';

  if (projects.selectedProjectId) {
    let tasks = [];
    tasks = projects.tasks.filter(
      (task) => task.projectId === projects.selectedProjectId
    );

    const projectDetails = projects.projects.find(
      (project) => project.id === projects.selectedProjectId
    );
    content = (
      <SelectedProject
        projectDetails={projectDetails}
        tasks={tasks}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
      />
    );
  }

  if (projects.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleAddProject} />;
  }
  if (projects.selectedProjectId === null) {
    content = (
      <NewProject
        onCreateProject={handleCreateProject}
        onCancel={handleCancelAddProject}
      />
    );
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectsSidebar
        onAddProject={handleAddProject}
        projects={projects.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projects.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
