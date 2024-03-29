## Real Time Chat Application

## Overview

The project aims to develop a simple chat server and client application that facilitates real-time communication over the network using sockets. It supports multiple client connections simultaneously, enabling users to exchange messages in a shared chatroom environment.

## Features

- Real-time Communication: Utilizes sockets to enable instantaneous message exchange between clients and the server.
- Multi-client Support: Allows multiple clients to connect to the server concurrently, participating in the chatroom.
- Shared Chatroom Environment: Users interact within a common chatroom, sending and receiving messages visible to all connected clients.

## Setup

#1. Clone the repository:

```bash
git clone https://github.com/Panthil2812/real-time-chat-application.git
```

#2. Install client dependencies

```bash
cd client
npm install -f
```

#3. Install server dependencies

```bash
cd ../server
npm install -f
```

#4. Set Environment Variable for Both side

client env

```bash
REACT_APP_BACKEND_BASE_URL=
REACT_APP_LOCALHOST_KEY=

```

server env

```bash
PORT=
MONGODB=
JWT_SECRET_KEY=
```

#5. Start project

```bash
cd client
npm run start
```

```bash
cd server
npm run start
```
