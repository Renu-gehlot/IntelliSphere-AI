# from fastapi import APIRouter
# from models.project import Project

# router = APIRouter()


# @router.post("/projects")
# def create_project(project: Project):

#     return {
#         "message": "Project created successfully!",
#         "project": project
#     }

from fastapi import APIRouter
from models.project import Project
import sqlite3

router = APIRouter()


# ---------------- POST ----------------

@router.post("/projects")
def create_project(project: Project):

    connection = sqlite3.connect("intellisphere.db")

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO Projects (project_name, manager, deadline,status)
        VALUES (?, ?, ?,?)
    """, (
        project.project_name,
        project.manager,
        project.deadline,
        project.status 
    ))

    connection.commit()

    connection.close()

    return {
        "message": "Project saved successfully!"
    }


# ---------------- DELETE ----------------

@router.delete("/projects/{project_id}")
def delete_project(project_id: int):

    connection = sqlite3.connect("intellisphere.db")

    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM Projects WHERE id=?",
        (project_id,)
    )

    connection.commit()

    connection.close()

    return {
        "message": "Project deleted successfully!"
    }
#----------------UPDATE-------------
@router.put("/projects/{project_id}")
def update_project(project_id: int, project: Project):

    connection = sqlite3.connect("intellisphere.db")

    cursor = connection.cursor()

    cursor.execute("""
        UPDATE Projects
        SET project_name=?, manager=?, deadline=?,status=?
        WHERE id=?
    """, (
        project.project_name,
        project.manager,
        project.deadline,
        project.status,
        project_id
    ))

    connection.commit()

    connection.close()

    return {
        "message": "Project updated successfully!"
    }