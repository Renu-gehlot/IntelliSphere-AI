function Stats({ total, pending, progress, completed }) {
  return (
    <div className="dashboard">

      <div className="welcome-card">
        <div>
          <p className="welcome-tag">WELCOME BACK</p>
          <h2>Project Intelligence Dashboard</h2>
          <p>
            Monitor projects, AI activity and knowledge base from one place.
          </p>
        </div>

        <div className="welcome-icon"></div>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon total"></div>
          <div>
            <h4>Total Projects</h4>
            <h1>{total}</h1>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">🟡</div>
          <div>
            <h4>Pending</h4>
            <h1>{pending}</h1>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress">🔵</div>
          <div>
            <h4>In Progress</h4>
            <h1>{progress}</h1>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">🟢</div>
          <div>
            <h4>Completed</h4>
            <h1>{completed}</h1>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Stats;