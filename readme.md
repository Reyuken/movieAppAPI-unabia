# S84 Mock Technical Exam – Movie Catalog API

## Application Name: Movie Catalog API

---

## 👤 Developer
- Ray Unabia

---

## User Credentials

### Admin User
- **Email:** admin@mail.com
- **Password:** admin123

### Test User
- **Email:** user@mail.com
- **Password:** password123

---

## Features

### User Resources
- User Registration
- User Authentication (Login)
- Retrieve User Details
- User Roles with `isAdmin` Property

### Movie Resources
- Add Movie (Admin Only)
- Retrieve All Movies
- Retrieve Specific Movie

---

## Movie Data Model

Each movie document contains:

- Title
- Director
- Year
- Description
- Genre
- Comments (Subdocument Array)

Example:

```json
{
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010,
    "description": "A thief enters people's dreams to steal secrets.",
    "genre": "Sci-Fi",
    "comments": []
}