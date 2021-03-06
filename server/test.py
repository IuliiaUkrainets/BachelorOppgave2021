import requests

BASE = "http://127.0.0.1:5000/"

data = [{"name": "iuk", "date": "17.02.21", "comment": "happy"},
        {"name": "ira", "date": "12.02.21", "comment": "sad"},
        {"name": "siv", "date": "01.02.21", "comment": "smile"}]

for i in range(len(data)):
    response = requests.put(BASE + "image/" + str(i), data[i])
    print(response.json())

input()
response = requests.delete(BASE + "image/0")
print(response)
input()
#response = requests.get(BASE + "helloworld/user")
# print(response.json())
#response = requests.get(BASE + "patient/patient")
#print(response.json())
response = requests.get(BASE + "image/2")
print(response.json())
input()


#response = requests.get(BASE + "image/1", {"comment": 10})
#print(response.json())