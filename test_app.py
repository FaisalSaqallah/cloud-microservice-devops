
import sys
sys.path.append('.')
import app

def test_add_task():
    result = app.add_task("Test task")
    assert result["task"] == "Test task"
    assert result["completed"] == False
