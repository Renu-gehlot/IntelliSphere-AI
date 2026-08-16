import sqlite3

connection = sqlite3.connect("intellisphere.db")
cursor = connection.cursor()

# Change the ID to the project you want to delete
cursor.execute("DELETE FROM Projects WHERE id = 4")
cursor.execute("DELETE FROM Projects WHERE id = 5")
cursor.execute("DELETE FROM Projects WHERE id = 6")

connection.commit()

print("✅ Project deleted successfully!")

connection.close()