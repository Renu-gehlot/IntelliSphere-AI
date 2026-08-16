from pydantic import BaseModel

class Project(BaseModel):
    project_name: str
    manager: str
    deadline: str
    status: str