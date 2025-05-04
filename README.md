
# DevOps Microservice: To-Do List Application

A full-stack To-Do List microservice with a Python backend (in-memory) and a simple HTML/CSS/JS frontend.

## Team Members

- **Faisal Saqallah** – 202045600
- **Abderrahman Chaabouni** – 202044500
- **Ghali Alharbi** – 201914850

---

## Tech Stack

- Python (http.server module)
- HTML, CSS, JavaScript (vanilla)
- GitHub Projects for planning
- GitHub Actions (CI/CD pipeline)
- Docker (for packaging)

---

## Project Structure

```
.
├── app.py                  # Python backend (in-memory storage)
├── index.html              # Frontend UI
├── styles.css              # Styling
├── README.md               # Documentation
├── Dockerfile              # (to be added)
└── .github/workflows/      # CI/CD pipelines
```

---

## Running Locally

1. Start the backend:
```bash
python3 app.py
```

2. Open the frontend:
Open `index.html` in any modern web browser.

---

## API Endpoints

- `GET /todos` - List all tasks
- `POST /todos` - Add a task (`{ "task": "Example Task" }`)
- `PUT /todos/<id>` - Toggle task completion
- `DELETE /todos/<id>` - Remove a task

---

## Architecture Diagram

![image](https://github.com/user-attachments/assets/8c861891-b67c-4002-8fb1-ebc74d02419b)


---

## Usage

- Add tasks through the input field.
- Click checkboxes to mark complete.
- Click delete to remove tasks.
- Tasks are stored in memory and will reset on server restart.

---

## Notes

- No external database required.
- Easy to deploy with Docker.
- CI/CD using GitHub Actions and deployment on cloud services.
