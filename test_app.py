import sys
sys.path.append(".")
from app import add_task

def test_add_task():
    result = add_task("Test task")
    assert result["task"] == "Test task"
    assert result["completed"] == False
