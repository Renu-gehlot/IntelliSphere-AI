import sqlite3

connection = sqlite3.connect("intellisphere.db")

cursor = connection.cursor()

cursor.execute("""
ALTER TABLE Projects
ADD COLUMN status TEXT DEFAULT 'Pending'
""")

connection.commit()

connection.close()

print("✅ Status column added successfully!")