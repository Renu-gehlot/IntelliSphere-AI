import sqlite3

# Connect to the database
connection = sqlite3.connect("intellisphere.db")

# Create a cursor
cursor = connection.cursor()

# Read all rows from the Projects table
cursor.execute("SELECT * FROM Projects")

# Store all rows in a variable
projects = cursor.fetchall()

# Print each project
for project in projects:
    print(project)

# Close the database connection
connection.close()