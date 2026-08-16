# import sqlite3

# DATABASE_NAME = "intellisphere.db"

# connection = sqlite3.connect(DATABASE_NAME)

# print("✅ Database connected successfully!")
import sqlite3

# Database file name
DATABASE_NAME = "intellisphere.db"

# Connect to database
connection = sqlite3.connect(DATABASE_NAME)

# Create a cursor
cursor = connection.cursor()

# Execute SQL command
cursor.execute("""
CREATE TABLE IF NOT EXISTS Projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_name TEXT NOT NULL,
    manager TEXT NOT NULL,
    deadline TEXT NOT NULL
)
""")
cursor.execute("""
INSERT INTO Projects (project_name, manager, deadline)
VALUES (?, ?, ?)
""", (
    "IntelliSphere AI",
    "Renu",
    "15 Aug"
))
# Save changes
connection.commit()

print("✅ Database and Projects table created successfully!")

# Close connection
connection.close()
