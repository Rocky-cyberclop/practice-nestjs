# NestJS App

## Features

### Search User - Method GET

    localhost:3000/user/search

query: {
    username,
    fullname,
    role,
    projects,
    activeYn
}

### Example

```
localhost:3000/user/search?username=anle
```  

Success -> Status: 200

### Insert User - Method POST

    localhost:3000/user/insert

body: {
    username: "anle",
    fullname: "Le Dang Hoang An",
    role: "Developer",
    projects: ["D&D", "Tiger"],
    activeYn: "Y",
}

### Example

```
localhost:3000/user/insert

{
    "username": "anle",
    "fullname": "Le Dang Hoang An",
    "role": "Developer",
    "projects": ["D&D", "Tiger"],
    "activeYn": "Y"
}
```

Success -> Status: 201
Error -> Status: 400

### Edit User - Method PATCH

    localhost:3000/user/:username

param: username

body: {
    role 'Teacher'
}

### Example

```
localhost:3000/user/anle

{
    "role": "Teacher"
}
```

Success -> Status: 200
Error -> Status: 400

### Delete User

Delete User - Method DELETE

    localhost:3000/user/:username

param: username

```
localhost:3000/user/anle
```  

Success -> Status: 200
Error -> Status: 400
