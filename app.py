
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import urlparse, parse_qs

# In-memory store
todos = []
next_id = 1

# ✅ Testable function
def add_task(task):
    return {"id": 1, "task": task, "completed": False}

class TodoHandler(BaseHTTPRequestHandler):
    def _set_headers(self, code=200):
        self.send_response(code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        if self.path == '/todos':
            self._set_headers()
            self.wfile.write(json.dumps(todos).encode())

    def do_POST(self):
        global next_id
        if self.path == '/todos':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            task = data.get("task")
            if task:
                new_todo = {"id": next_id, "task": task, "completed": False}
                todos.append(new_todo)
                next_id += 1
                self._set_headers(201)
                self.wfile.write(json.dumps(new_todo).encode())
            else:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": "Missing task field"}).encode())

    def do_PUT(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path.startswith('/todos/'):
            todo_id = int(parsed_path.path.split('/')[-1])
            for todo in todos:
                if todo['id'] == todo_id:
                    todo['completed'] = not todo['completed']
                    self._set_headers()
                    self.wfile.write(json.dumps(todo).encode())
                    return
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Todo not found"}).encode())

    def do_DELETE(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path.startswith('/todos/'):
            todo_id = int(parsed_path.path.split('/')[-1])
            global todos
            todos = [todo for todo in todos if todo['id'] != todo_id]
            self._set_headers(204)

def run(server_class=HTTPServer, handler_class=TodoHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Serving on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
