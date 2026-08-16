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
import Header from "./components/Header";
import Stats from "./components/Stats";
import KnowledgeBase from "./components/KnowledgeBase";

function App() {

  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [manager, setManager] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const totalProjects = projects.length;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageQuestion, setImageQuestion] = useState("");
  const [imageAnswer, setImageAnswer] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

const pendingProjects = projects.filter(
  (project) => project[4] === "Pending"
).length;

const inProgressProjects = projects.filter(
  (project) => project[4] === "In Progress"
).length;

const completedProjects = projects.filter(
  (project) => project[4] === "Completed"
).length;
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
// const askAI = async () => {

//   try {

//     const response = await fetch(
//       "http://localhost:8000/ask",
//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           question: question,
//         }),
//       }
//     );

//     const data = await response.json();

//     setAnswer(data.answer);

//   } catch (error) {

//     console.error(error);

//     setAnswer("❌ Could not connect to AI");

//   }

// };
const askAI = async () => {

  if (!question.trim()) {
    return;
  }

  setLoading(true);

  try {

    const response = await fetch(
      "http://localhost:8000/ask",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: question,
        }),
      }
    );

    const data = await response.json();

    const newChat = {
      question: question,
      answer: data.answer,
    };

    setChatHistory((previousChat) => [
      ...previousChat,
      newChat
    ]);

    setQuestion("");

  } catch (error) {

    console.error(error);

    const newChat = {
      question: question,
      answer: "Could not connect to AI."
    };

    setChatHistory((previousChat) => [
      ...previousChat,
      newChat
    ]);

  }

  setLoading(false);
};
const uploadPDF = async () => {

  if (!selectedFile) {
    setUploadMessage("Please select a document first.");
    return;
  }
  const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain"
];

if (!allowedTypes.includes(selectedFile.type)) {
    setUploadMessage("Please select a document file.");
    return;
}

  setUploading(true);
  setUploadMessage("");

  try {

    const formData = new FormData();

    formData.append("file", selectedFile);

    const response = await fetch(
      "http://localhost:8000/upload-pdf",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {

      setUploadMessage(
        `✅ ${data.filename} uploaded and indexed successfully! (${data.chunks} chunks)`
      );

      setSelectedFile(null);

    } else {

      setUploadMessage(" Upload failed.");

    }

  } catch (error) {

    console.error(error);

    setUploadMessage(" Could not connect to backend.");

  }

  setUploading(false);
};
const uploadImage = async () => {
  if (!selectedImage) {
    setImageAnswer("Please select an image.");
    return;
  }

  if (!imageQuestion.trim()) {
    setImageAnswer(" Please enter a question about the image.");
    return;
  }

  const formData = new FormData();

  formData.append("file", selectedImage);
  formData.append("question", imageQuestion);

  setImageLoading(true);
  setImageAnswer("");

  try {
    const response = await fetch(
      "http://localhost:8000/upload-image",
      // "http://127.0.0.1:8000/upload-image",
      {
        method: "POST",
        body: formData,
      }
    );
    console.log("Response status:", response.status);    

    const data = await response.json();
    console.log("Backend response:", data);

    if (!response.ok) {
      throw new Error(data.detail || "Image upload failed");
    }

    setImageAnswer(data.answer);

  } catch (error) {
    console.error("Image upload error:", error);
    setImageAnswer(" " + error.message);

  } finally {
    setImageLoading(false);
  }
};
return (
  <div className="app">

    {/* Header */}
    <Header />

    {/* Dashboard Stats */}
    <Stats
      total={projects.length}
      pending={pendingProjects}
      progress={inProgressProjects}
      completed={completedProjects}
    />

    {/* Knowledge Base */}
{/* <div className="two-column">

  <KnowledgeBase
    selectedFile={selectedFile}
    setSelectedFile={setSelectedFile}
    setSelectedImage={setSelectedImage}
    uploadPDF={uploadPDF}
    uploadImage={uploadImage}
    uploading={uploading}
    imageLoading={imageLoading}
    uploadMessage={uploadMessage}
    imageQuestion={imageQuestion}
    setImageQuestion={setImageQuestion}
    imageAnswer={imageAnswer}
  />
    {/* AI Assistant */}
    {/* <div className="section ai-section">

      <h2>🤖 AI Assistant</h2>

      <div className="chat-box">
        {chatHistory.map((chat, index) => (
          <div className="chat-message" key={index}>

            <div className="user-message">
              <strong>🧑 You</strong>
              <p>{chat.question}</p>
            </div>

            <div className="ai-message">
              <strong>🤖 IntelliSphere</strong>
              <p>{chat.answer}</p>
            </div>

          </div>
        ))}

        {loading && (
          <div className="ai-message">
            
            <p>⏳ Thinking...</p>
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="Ask anything about your uploaded documents..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") askAI();
        }}
      />

      
        <button
          className="primary-btn"
          onClick={askAI}
          disabled={loading}
        >
          {loading ? "Asking..." : "🧠 Ask AI"}
        </button>

        {/* <button
          onClick={() => {
            setChatHistory([]);
            setQuestion("");
          }}
          style={{ marginLeft: "10px" }}
        >
          New Chat
        </button> */}
<div className="two-column">

  <KnowledgeBase
    selectedFile={selectedFile}
    setSelectedFile={setSelectedFile}
    setSelectedImage={setSelectedImage}
    uploadPDF={uploadPDF}
    uploadImage={uploadImage}
    uploading={uploading}
    imageLoading={imageLoading}
    uploadMessage={uploadMessage}
    imageQuestion={imageQuestion}
    setImageQuestion={setImageQuestion}
    imageAnswer={imageAnswer}
  />
<div className="ai-section">
  <div className="section-header">
    <h2> AI Assistant</h2>
    <p>Ask questions about your uploaded documents</p>
  </div>

  <div className="chat-window">

    {chatHistory.length === 0 && (
      <div className="empty-chat">
        <h3>Welcome to IntelliSphere AI</h3>
        <p>
          Upload documents and start asking questions.
        </p>
      </div>
    )}

    {chatHistory.map((chat, index) => (
      <div key={index}>
        <div className="user-bubble">
          <strong>You</strong>
          <p>{chat.question}</p>
        </div>

        <div className="ai-bubble">
          <strong>IntelliSphere</strong>
          <p>{chat.answer}</p>
        </div>
      </div>
    ))}

    {loading && (
      <div className="ai-bubble">
        <strong>IntelliSphere</strong>
        <p>Thinking...</p>
      </div>
    )}

  </div>
<div className="chat-input-area">
  <input
    type="text"
    placeholder="Ask anything..."
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") askAI();
    }}
  />

  <button
    className="send-btn"
    onClick={askAI}
    disabled={loading}
  >
    ➜
  </button>
</div>
<div className="chat-footer">
  <button
    className="new-chat-btn"
    onClick={() => {
      setChatHistory([]);
      setQuestion("");
    }}
  >
     New Chat
  </button>
</div>
</div>
</div>    

    {/* Project Management */}
    <div className="section project-section">

    <div className="project-header">

  <div>
    <h2> Project Management</h2>
    <p>Manage and organize all your projects</p>
  </div>

</div>
<div className="project-toolbar">
  <input
    className="search-input"
    type="text"
    placeholder="🔍 Search project..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
  />

  <select
    value={sortBy}
    onChange={(e)=>setSortBy(e.target.value)}
  >
    <option value="name">Name</option>
    <option value="manager">Manager</option>
    <option value="deadline">Deadline</option>
  </select>
</div>

<div className="project-form">

  <input
    type="text"
    placeholder="Project Name"
    value={projectName}
    onChange={(e)=>setProjectName(e.target.value)}
  />

  <input
    type="text"
    placeholder="Manager"
    value={manager}
    onChange={(e)=>setManager(e.target.value)}
  />

  <input
    type="text"
    placeholder="Deadline"
    value={deadline}
    onChange={(e)=>setDeadline(e.target.value)}
  />

  <select
    value={status}
    onChange={(e)=>setStatus(e.target.value)}
  >
    <option>Pending</option>
    <option>In Progress</option>
    <option>Completed</option>
  </select>

</div>

<button
  className="primary-btn add-btn"
  onClick={saveProject}
>
  {editingId ? " Save Changes" : "➕ Add Project"}
</button>

      <hr />
{/* 
      <input
        type="text"
        placeholder="Search Project..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="name">Project Name</option>
        <option value="manager">Manager</option>
        <option value="deadline">Deadline</option>
      </select> */}

      <div style={{ marginTop: "20px" }}>
        {sortedProjects.map((project) => (
  <div className="project-card" key={project[0]}>

    <div className="project-left">
      <h3> {project[1]}</h3>

      <p> {project[2]}</p>

      <p> {project[3]}</p>
    </div>

    <div className="project-right">

      <span className={`badge ${project[4].replace(" ", "-")}`}>
        {project[4]}
      </span>

      <div className="action-buttons">

        <button
          className="edit-btn"
          onClick={() => editProject(project)}
        >
          ✏️
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteProject(project[0])}
        >
          🗑
        </button>

      </div>

    </div>

  </div>
))}
      
      </div>

    </div>

  </div>
);
}

export default App;