export default function KnowledgeBase({
  selectedFile,
  setSelectedFile,
  setSelectedImage,
  uploadPDF,
  uploadImage,
  uploading,
  imageLoading,
  uploadMessage,
  imageQuestion,
  setImageQuestion,
  imageAnswer,
}) {
  return (
    <div className="section">

      <div className="section-header">
        <h2> Knowledge Base</h2>
        <p>Upload documents or images for AI analysis</p>
      </div>

      <label className="upload-box">
        <input
          type="file"
          accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.webp"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            setSelectedFile(file);
            setSelectedImage(file);
          }}
        />

        <div className="upload-content">
          <h3>⬆ Drop files here</h3>
          <p>PDF · DOCX · TXT · JPG · PNG</p>
        </div>
      </label>

      {selectedFile && (
        <div className="selected-file">
          📎 {selectedFile.name}
        </div>
      )}

      {selectedFile &&
        ["image/jpeg","image/png","image/webp"].includes(selectedFile.type) && (
          <>
            <input
              type="text"
              placeholder="Ask about this image..."
              value={imageQuestion}
              onChange={(e)=>setImageQuestion(e.target.value)}
            />

            <button
              className="primary-btn"
              onClick={uploadImage}
            >
              {imageLoading ? "Analyzing..." : "Analyze Image"}
            </button>

            {imageAnswer && (
              <div className="answer-box">
                {imageAnswer}
              </div>
            )}
          </>
        )}

      {selectedFile &&
        !["image/jpeg","image/png","image/webp"].includes(selectedFile.type) && (
          <button
            className="primary-btn"
            onClick={uploadPDF}
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
        )}

      {uploadMessage && (
        <div className="success-box">
          {uploadMessage}
        </div>
      )}

    </div>
  );
}