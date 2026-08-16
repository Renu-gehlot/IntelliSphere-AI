// import { useState } from "react";

// function App() {

//   // Stores the message received from FastAPI
//   const [message, setMessage] = useState("");

//   // Function to call the backend
//   const connectBackend = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/");

//       const data = await response.json();

//       setMessage(data.message);
//     } catch (error) {
//       setMessage("❌ Could not connect to backend");
//       console.error(error);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "80px" }}>

//       <h1>🧠 IntelliSphere AI</h1>

//       <h2>Autonomous Decision Intelligence Platform</h2>

//       <p>Welcome to IntelliSphere AI.</p>

//       <button onClick={connectBackend}>
//         Connect Backend
//       </button>

//       <h3>{message}</h3>

//     </div>
//   );
// }

// export default App;
import "./app1.css";
import { useEffect, useState } from "react";

function App() {

  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [manager, setManager] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const fetchProjects = () => {
  fetch("http://localhost:8000/projects")
    .then((response) => response.json())
    .then((data) => {
      setProjects(data.projects);
    });
};
     useEffect(() => {
    fetchProjects();
}, []);
//   useEffect(() => {
//   console.log("Fetching projects...");

//   fetch("http://localhost:8000/projects")
//     .then((response) => {
//       console.log("Status:", response.status);
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Data received:", data);
//       setProjects(data.projects);
//     })
//     .catch((error) => {
//       console.error("Fetch Error:", error);
//     });
// }, []);



//   const addProject = async () => {
//     console.log("✅ Button clicked!");
    

//     const response = await fetch(
//         "http://localhost:8000/projects",
//         {
//             method: "POST",

//             headers: {
//                 "Content-Type": "application/json",
//             },

//             body: JSON.stringify({
//                 project_name: projectName,
//                 manager: manager,
//                 deadline: deadline,
//             }),
//         }
//     );

//     const data = await response.json();

//     console.log(data);
//     fetchProjects();
//     setProjectName("");
//     setManager("");
//     setDeadline("");

// };
const deleteProject = async (id) => {

  const response = await fetch(
    `http://localhost:8000/projects/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  console.log(data);

  fetchProjects();

};
const editProject = (project) => {

    setEditingId(project[0]);

    setProjectName(project[1]);

    setManager(project[2]);

    setDeadline(project[3]);
    setStatus(project[4]);

};
const saveProject = async () => {

    if (editingId !== null) {

        // UPDATE PROJECT

        const response = await fetch(
            `http://localhost:8000/projects/${editingId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    project_name: projectName,
                    manager: manager,
                    deadline: deadline,
                    status: status,
                }),
            }
        );

        const data = await response.json();

        console.log(data);

        setEditingId(null);

    } else {

        // CREATE PROJECT

        const response = await fetch(
            "http://localhost:8000/projects",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    project_name: projectName,
                    manager: manager,
                    deadline: deadline,
                    status: status,
                }),
            }
        );

        const data = await response.json();

        console.log(data);
    }

    fetchProjects();

    setProjectName("");
    setManager("");
    setDeadline("");
};



//   return (
//     <div>

//       <h1>🧠 IntelliSphere AI</h1>

//       <h2>Projects</h2>

      
//       <div>
//   {projects.map((project) => (
//     <div
//       key={project[0]}
//       style={{
//         border: "1px solid #ccc",
//         borderRadius: "10px",
//         padding: "15px",
//         marginBottom: "15px",
//         width: "350px",
//       }}
//     >
//       <h3>📁 {project[1]}</h3>

//       <p>
//         <strong>👤 Manager:</strong> {project[2]}
//       </p>

//       <p>
//         <strong>📅 Deadline:</strong> {project[3]}
//       </p>
//     </div>
//   ))}
// </div>

//     </div>
//   );
const filteredProjects = projects.filter((project) =>
    project[1]
        .toLowerCase()
        .includes(search.toLowerCase())
);
const sortedProjects = [...filteredProjects];
if (sortBy === "name") {
    sortedProjects.sort((a, b) =>
        a[1].localeCompare(b[1])
    );
}

if (sortBy === "manager") {
    sortedProjects.sort((a, b) =>
        a[2].localeCompare(b[2])
    );
}

if (sortBy === "deadline") {
    sortedProjects.sort((a, b) =>
        a[3].localeCompare(b[3])
    );
}
return (
  <div className="app">

    <h1 className="title"> IntelliSphere AI</h1>

    <h2 className="subtitle">
      Autonomous Decision Intelligence Platform
    </h2>
    <div className="dashboard">

    <div className="stat-card">
        <h3> Total Projects</h3>
        <h1>{projects.length}</h1>
    </div>

    <div className="stat-card">
        <h3>🔍 Search Results</h3>
        <h1>{filteredProjects.length}</h1>
    </div>

</div>
    <h2>Add New Project</h2>

<input
  // type="text"
  // placeholder="Project Name"
  // onChange={(event) => setProjectName(event.target.value)}
   type="text"
   placeholder="Project Name"
   value={projectName}
   onChange={(event) => setProjectName(event.target.value)}
/>

<br /><br />

<input
  type="text"
  placeholder="Manager"
  value={manager}
  onChange={(event) => setManager(event.target.value)}
/>

<br /><br />

<input
  // type="text"
  // placeholder="Deadline"
  // onChange={(event) => setDeadline(event.target.value)}
  type="text"
  placeholder="Deadline"
  value={deadline}
  onChange={(event) => setDeadline(event.target.value)}
/>

<br /><br />
<select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
>
    <option value="Pending">🟡 Pending</option>
    <option value="In Progress">🔵 In Progress</option>
    <option value="Completed">🟢 Completed</option>
</select>

<br /><br />

{/* <button onClick={addProject}>
  Add Project
</button> */}

<button onClick={saveProject}>
    {editingId !== null ? " Save Changes" : "➕ Add Project"}
</button>
<p>Project: {projectName}</p>
<p>Manager: {manager}</p>
<p>Deadline: {deadline}</p>
<h2>🔍 Search Project</h2>

<input
    type="text"
    placeholder="Search project..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

<br /><br />
<h2> Sort Projects</h2>

<select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
>
    <option value="name">Project Name</option>
    <option value="manager">Manager</option>
    <option value="deadline">Deadline</option>
</select>

<br /><br />

<hr />

    {/* {projects.map((project) => ( */}
    {
// projects
// .filter((project) =>
//     project[1]
//         .toLowerCase()
//         .includes(search.toLowerCase())
// )
// .map((project) => (
// filteredProjects.map((project) => (
sortedProjects.map((project) => (

      <div className="card" key={project[0]}>

        <h3> {project[1]}</h3>

        <p>
          <strong>Manager:</strong> {project[2]}
        </p>

        <p>
          <strong>Deadline:</strong> {project[3]}
        </p>
        {/* <p>
         <strong>📌 Status:</strong> {project[4]}
        </p> */}
        <p>
    <strong>📌 Status:</strong>

    <span
        style={{
            color:
                project[4] === "Completed"
                    ? "green"
                    : project[4] === "In Progress"
                    ? "blue"
                    : "orange",

            fontWeight: "bold",
        }}
    >
        {project[4]}
    </span>
</p>

        <button 
        onClick={() => editProject(project)}>
          Edit
          </button>
         <button
         onClick={() => deleteProject(project[0])}
        >
      🗑 Delete
    </button>

      </div>

    ))}

  </div>
);

}
export default App;
