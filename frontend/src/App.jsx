// // import { useState } from "react";

// // function App() {

// //   // Stores the message received from FastAPI
// //   const [message, setMessage] = useState("");

// //   // Function to call the backend
// //   const connectBackend = async () => {
// //     try {
// //       const response = await fetch("http://127.0.0.1:8000/");

// //       const data = await response.json();

// //       setMessage(data.message);
// //     } catch (error) {
// //       setMessage("❌ Could not connect to backend");
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div style={{ textAlign: "center", marginTop: "80px" }}>

// //       <h1>🧠 IntelliSphere AI</h1>

// //       <h2>Autonomous Decision Intelligence Platform</h2>

// //       <p>Welcome to IntelliSphere AI.</p>

// //       <button onClick={connectBackend}>
// //         Connect Backend
// //       </button>

// //       <h3>{message}</h3>

// //     </div>
// //   );
// // }

// // export default App;
// import "./App.css";
// import { useEffect, useState } from "react";
// // import Header from "./components/Header";
// // import Stats from "./components/Stats";
// // import KnowledgeBase from "./components/KnowledgeBase";

// function App() {

//   const [projects, setProjects] = useState([]);
//   const [projectName, setProjectName] = useState("");
//   const [manager, setManager] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [status, setStatus] = useState("Pending");
//   const [editingId, setEditingId] = useState(null);
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("name");
//   const totalProjects = projects.length;
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageQuestion, setImageQuestion] = useState("");
//   const [imageAnswer, setImageAnswer] = useState("");
//   const [imageLoading, setImageLoading] = useState(false);

// const pendingProjects = projects.filter(
//   (project) => project[4] === "Pending"
// ).length;

// const inProgressProjects = projects.filter(
//   (project) => project[4] === "In Progress"
// ).length;

// const completedProjects = projects.filter(
//   (project) => project[4] === "Completed"
// ).length;
//   const fetchProjects = () => {
//   fetch("http://localhost:8000/projects")
//     .then((response) => response.json())
//     .then((data) => {
//       setProjects(data.projects);
//     });
// };
//      useEffect(() => {
//     fetchProjects();
// }, []);
// //   useEffect(() => {
// //   console.log("Fetching projects...");

// //   fetch("http://localhost:8000/projects")
// //     .then((response) => {
// //       console.log("Status:", response.status);
// //       return response.json();
// //     })
// //     .then((data) => {
// //       console.log("Data received:", data);
// //       setProjects(data.projects);
// //     })
// //     .catch((error) => {
// //       console.error("Fetch Error:", error);
// //     });
// // }, []);



// //   const addProject = async () => {
// //     console.log("✅ Button clicked!");
    

// //     const response = await fetch(
// //         "http://localhost:8000/projects",
// //         {
// //             method: "POST",

// //             headers: {
// //                 "Content-Type": "application/json",
// //             },

// //             body: JSON.stringify({
// //                 project_name: projectName,
// //                 manager: manager,
// //                 deadline: deadline,
// //             }),
// //         }
// //     );

// //     const data = await response.json();

// //     console.log(data);
// //     fetchProjects();
// //     setProjectName("");
// //     setManager("");
// //     setDeadline("");

// // };
// const deleteProject = async (id) => {

//   const response = await fetch(
//     `http://localhost:8000/projects/${id}`,
//     {
//       method: "DELETE",
//     }
//   );

//   const data = await response.json();

//   console.log(data);

//   fetchProjects();

// };
// const editProject = (project) => {

//     setEditingId(project[0]);

//     setProjectName(project[1]);

//     setManager(project[2]);

//     setDeadline(project[3]);
//     setStatus(project[4]);

// };
// const saveProject = async () => {

//     if (editingId !== null) {

//         // UPDATE PROJECT

//         const response = await fetch(
//             `http://localhost:8000/projects/${editingId}`,
//             {
//                 method: "PUT",

//                 headers: {
//                     "Content-Type": "application/json",
//                 },

//                 body: JSON.stringify({
//                     project_name: projectName,
//                     manager: manager,
//                     deadline: deadline,
//                     status: status,
//                 }),
//             }
//         );

//         const data = await response.json();

//         console.log(data);

//         setEditingId(null);

//     } else {

//         // CREATE PROJECT

//         const response = await fetch(
//             "http://localhost:8000/projects",
//             {
//                 method: "POST",

//                 headers: {
//                     "Content-Type": "application/json",
//                 },

//                 body: JSON.stringify({
//                     project_name: projectName,
//                     manager: manager,
//                     deadline: deadline,
//                     status: status,
//                 }),
//             }
//         );

//         const data = await response.json();

//         console.log(data);
//     }

//     fetchProjects();

//     setProjectName("");
//     setManager("");
//     setDeadline("");
// };



// //   return (
// //     <div>

// //       <h1>🧠 IntelliSphere AI</h1>

// //       <h2>Projects</h2>

      
// //       <div>
// //   {projects.map((project) => (
// //     <div
// //       key={project[0]}
// //       style={{
// //         border: "1px solid #ccc",
// //         borderRadius: "10px",
// //         padding: "15px",
// //         marginBottom: "15px",
// //         width: "350px",
// //       }}
// //     >
// //       <h3>📁 {project[1]}</h3>

// //       <p>
// //         <strong>👤 Manager:</strong> {project[2]}
// //       </p>

// //       <p>
// //         <strong>📅 Deadline:</strong> {project[3]}
// //       </p>
// //     </div>
// //   ))}
// // </div>

// //     </div>
// //   );
// const filteredProjects = projects.filter((project) =>
//     project[1]
//         .toLowerCase()
//         .includes(search.toLowerCase())
// );
// const sortedProjects = [...filteredProjects];
// if (sortBy === "name") {
//     sortedProjects.sort((a, b) =>
//         a[1].localeCompare(b[1])
//     );
// }

// if (sortBy === "manager") {
//     sortedProjects.sort((a, b) =>
//         a[2].localeCompare(b[2])
//     );
// }

// if (sortBy === "deadline") {
//     sortedProjects.sort((a, b) =>
//         a[3].localeCompare(b[3])
//     );
// }
// // const askAI = async () => {

// //   try {

// //     const response = await fetch(
// //       "http://localhost:8000/ask",
// //       {
// //         method: "POST",

// //         headers: {
// //           "Content-Type": "application/json",
// //         },

// //         body: JSON.stringify({
// //           question: question,
// //         }),
// //       }
// //     );

// //     const data = await response.json();

// //     setAnswer(data.answer);

// //   } catch (error) {

// //     console.error(error);

// //     setAnswer("❌ Could not connect to AI");

// //   }

// // };
// const askAI = async () => {

//   if (!question.trim()) {
//     return;
//   }

//   setLoading(true);

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

//     const newChat = {
//       question: question,
//       answer: data.answer,
//     };

//     setChatHistory((previousChat) => [
//       ...previousChat,
//       newChat
//     ]);

//     setQuestion("");

//   } catch (error) {

//     console.error(error);

//     const newChat = {
//       question: question,
//       answer: "❌ Could not connect to AI."
//     };

//     setChatHistory((previousChat) => [
//       ...previousChat,
//       newChat
//     ]);

//   }

//   setLoading(false);
// };
// const uploadPDF = async () => {

//   if (!selectedFile) {
//     setUploadMessage("⚠️ Please select a document first.");
//     return;
//   }
//   const allowedTypes = [
//   "application/pdf",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   "text/plain"
// ];

// if (!allowedTypes.includes(selectedFile.type)) {
//     setUploadMessage("❌ Please select a document file.");
//     return;
// }

//   setUploading(true);
//   setUploadMessage("");

//   try {

//     const formData = new FormData();

//     formData.append("file", selectedFile);

//     const response = await fetch(
//       "http://localhost:8000/upload-pdf",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data = await response.json();

//     if (response.ok) {

//       setUploadMessage(
//         `✅ ${data.filename} uploaded and indexed successfully! (${data.chunks} chunks)`
//       );

//       setSelectedFile(null);

//     } else {

//       setUploadMessage("❌ Upload failed.");

//     }

//   } catch (error) {

//     console.error(error);

//     setUploadMessage("❌ Could not connect to backend.");

//   }

//   setUploading(false);
// };
// const uploadImage = async () => {
//   if (!selectedImage) {
//     setImageAnswer("❌ Please select an image.");
//     return;
//   }

//   if (!imageQuestion.trim()) {
//     setImageAnswer("❌ Please enter a question about the image.");
//     return;
//   }

//   const formData = new FormData();

//   formData.append("file", selectedImage);
//   formData.append("question", imageQuestion);

//   setImageLoading(true);
//   setImageAnswer("");

//   try {
//     const response = await fetch(
//       "http://localhost:8000/upload-image",
//       // "http://127.0.0.1:8000/upload-image",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );
//     console.log("Response status:", response.status);    

//     const data = await response.json();
//     console.log("Backend response:", data);

//     if (!response.ok) {
//       throw new Error(data.detail || "Image upload failed");
//     }

//     setImageAnswer(data.answer);

//   } catch (error) {
//     console.error("Image upload error:", error);
//     setImageAnswer("❌ " + error.message);

//   } finally {
//     setImageLoading(false);
//   }
// };
// return (
//   <div className="app">

//     <h1 className="title">🧠 IntelliSphere AI</h1>
//     <h2 className="subtitle">
//       Autonomous Decision Intelligence Platform
//     </h2>

//     {/* Knowledge Base */}
//     <div className="upload-section">
//       <h2>📚 Knowledge Base</h2>
//       <p>Upload documents or images and let IntelliSphere understand them.</p>

//       <input
//         type="file"
//         accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.webp"
//         onChange={(e) => {
//           const file = e.target.files[0];
//           setSelectedFile(file);
//           setSelectedImage(file);
//         }}
//       />

//       {selectedFile && (
//         <p>📎 Selected: <strong>{selectedFile.name}</strong></p>
//       )}

//       {/* Image UI */}
//       {selectedFile &&
//         ["image/jpeg","image/png","image/webp"].includes(selectedFile.type) && (
//           <div className="image-question">
//             <input
//               type="text"
//               placeholder="Ask something about this image..."
//               value={imageQuestion}
//               onChange={(e)=>setImageQuestion(e.target.value)}
//             />

//             <button onClick={uploadImage} disabled={imageLoading}>
//               {imageLoading ? "🔍 Analyzing..." : "🤖 Analyze Image"}
//             </button>

//             {imageAnswer && (
//               <div className="image-answer">
//                 <h3>🤖 IntelliSphere AI</h3>
//                 <p>{imageAnswer}</p>
//               </div>
//             )}
//           </div>
//       )}

//       {/* Document upload */}
//       {selectedFile &&
//         !["image/jpeg","image/png","image/webp"].includes(selectedFile.type) && (
//           <button onClick={uploadPDF} disabled={uploading}>
//             {uploading ? "⏳ Uploading..." : "📤 Upload to Knowledge Base"}
//           </button>
//       )}

//       {uploadMessage && <p>{uploadMessage}</p>}
//     </div>

//     {/* AI Chat */}
//     <div className="ai-section">
//       <h2>Ask IntelliSphere AI</h2>

//       <div className="chat-box">
//         {chatHistory.map((chat,index)=>(
//           <div className="chat-message" key={index}>
//             <div className="user-message">
//               <strong>🧑 You</strong>
//               <p>{chat.question}</p>
//             </div>

//             <div className="ai-message">
//               <strong>🤖 IntelliSphere AI</strong>
//               <p>{chat.answer}</p>
//             </div>
//           </div>
//         ))}

//         {loading && (
//           <div className="ai-message">
//             <p>⏳ Thinking...</p>
//           </div>
//         )}
//       </div>

//       <input
//         type="text"
//         placeholder="Ask a question about your documents..."
//         value={question}
//         onChange={(e)=>setQuestion(e.target.value)}
//         onKeyDown={(e)=>{
//           if(e.key==="Enter") askAI();
//         }}
//       />

//       <button onClick={askAI} disabled={loading}>
//         {loading ? "⏳ Asking..." : "🧠 Ask AI"}
//       </button>

//       <button onClick={()=>{
//         setChatHistory([]);
//         setQuestion("");
//       }}>
//         🆕 New Chat
//       </button>
//     </div>

//     {/* Stats */}
//     <div className="dashboard">
//       <div className="stat-card">
//         <h3>📁 Total Projects</h3>
//         <h1>{projects.length}</h1>
//       </div>

//       <div className="stat-card">
//         <h3>🟡 Pending</h3>
//         <h1>{pendingProjects}</h1>
//       </div>

//       <div className="stat-card">
//         <h3>🔵 In Progress</h3>
//         <h1>{inProgressProjects}</h1>
//       </div>

//       <div className="stat-card">
//         <h3>🟢 Completed</h3>
//         <h1>{completedProjects}</h1>
//       </div>
//     </div>

//     {/* Project Management */}
//     <div className="project-section">

//       <h2 className="section-title">📋 Project Management</h2>

//       <input
//         type="text"
//         placeholder="Project Name"
//         value={projectName}
//         onChange={(e)=>setProjectName(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Manager"
//         value={manager}
//         onChange={(e)=>setManager(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Deadline"
//         value={deadline}
//         onChange={(e)=>setDeadline(e.target.value)}
//       />

//       <select
//         value={status}
//         onChange={(e)=>setStatus(e.target.value)}
//       >
//         <option value="Pending">🟡 Pending</option>
//         <option value="In Progress">🔵 In Progress</option>
//         <option value="Completed">🟢 Completed</option>
//       </select>

//       <button onClick={saveProject}>
//         {editingId!==null ? "💾 Save Changes" : "➕ Add Project"}
//       </button>

//       <hr />

//       <input
//         type="text"
//         placeholder="Search project..."
//         value={search}
//         onChange={(e)=>setSearch(e.target.value)}
//       />

//       <select
//         value={sortBy}
//         onChange={(e)=>setSortBy(e.target.value)}
//       >
//         <option value="name">Project Name</option>
//         <option value="manager">Manager</option>
//         <option value="deadline">Deadline</option>
//       </select>

//       {sortedProjects.map((project)=>(
//         <div className="card" key={project[0]}>
//           <h3>📁 {project[1]}</h3>

//           <p><strong>👤 Manager:</strong> {project[2]}</p>
//           <p><strong>📅 Deadline:</strong> {project[3]}</p>

//           <p>
//             <strong>📌 Status:</strong>{" "}
//             <span
//               style={{
//                 color:
//                   project[4]==="Completed"
//                     ? "green"
//                     : project[4]==="In Progress"
//                     ? "blue"
//                     : "orange",
//                 fontWeight:"bold"
//               }}
//             >
//               {project[4]}
//             </span>
//           </p>

//           <button onClick={()=>editProject(project)}>
//             ✏ Edit
//           </button>

//           <button onClick={()=>deleteProject(project[0])}>
//             🗑 Delete
//           </button>
//         </div>
//       ))}

//     </div>

//   </div>
// );
// }

// export default App;