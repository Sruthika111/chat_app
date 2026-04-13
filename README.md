

#  Real-Time Chat Application

##  Overview
This is a real-time chat application built using the MERN stack with WebSockets (Socket.io). It enables users to communicate instantly through chat rooms and private messaging, with support for media sharing and persistent chat history.

---

##  Tech Stack
Frontend: React.js  
Backend: Node.js, Express.js  
Database: MongoDB (Atlas)  
Real-time Communication: Socket.io  
File Upload: Multer  

---

##  Features
-  User Authentication (Login/Register)
-  Real-time messaging using WebSockets
-  Chat Rooms (General, Tech, Random)
-  Private Messaging (User-to-User)
-  Online/Offline Status
-  File/Image Sharing
-  Message Persistence (MongoDB)
-  Responsive UI

---

## ⚙️ Setup Instructions

### Clone the Repository
```bash
git clone <your-github-link>
cd chat-app
````

---

###  Backend Setup

```bash
cd server
npm install
node server.js
```

Backend runs on: [http://localhost:5000](http://localhost:5000)

---

###  Frontend Setup

(Open a new terminal)

```bash
cd client
npm install
npm start
```

Frontend runs on: [http://localhost:3000](http://localhost:3000)

---

###  MongoDB Setup

* Use MongoDB Atlas for database
* Replace your connection string in `server.js`

Example:

```js
mongoose.connect("your_mongodb_connection_string")
```

---

##  Project Structure

```
chat-app/
 ├── client/   # React frontend
 ├── server/   # Node.js backend
 ├── README.md
```

---



##  Future Enhancements

* Typing indicator
* Message seen/delivered status
* Emoji support
* Deployment (Render / Netlify)

---


