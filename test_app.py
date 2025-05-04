import http.client

def test_get_todos():
    conn = http.client.HTTPConnection("localhost", 8000)
    conn.request("GET", "/todos")
    res = conn.getresponse()
    assert res.status == 200
