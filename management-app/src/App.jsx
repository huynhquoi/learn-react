import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/SideBar";
import SelectdProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectdProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTask = (taskData) => {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        ...taskData,
        projectId: prevState.selectdProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  };
  const handleDeleteTask = (taskId) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== taskId),
      };
    });
  };

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectdProjectId: null,
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectdProjectId: undefined,
      };
    });
  };

  const handleAddProject = (projectData) => {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectdProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  const handleSeletectProject = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectdProjectId: id,
      };
    });
  };

  const handleDeleteProject = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.filter((project) => project.id !== id),
        selectdProjectId: undefined,
      };
    });
  };

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectdProjectId
  );

  const selectedProjectTasks = projectsState.tasks.filter(
    (task) => task.projectId === projectsState.selectdProjectId
  );

  let content = (
    <SelectdProject
      project={selectedProject}
      tasks={selectedProjectTasks}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );
  if (projectsState.selectdProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectdProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSeletectProject}
      />
      {content}
    </main>
  );
}

export default App;
