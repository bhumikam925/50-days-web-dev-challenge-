# Synexus — Phase 5 Capstone

A modern, responsive web application developed as the **Phase 5 Capstone Project** for the Synexus 50-Day Web Development Challenge.

The project brings together the concepts learned throughout the challenge, including **SPA routing, Web Components, reactive state management, IndexedDB, API integration, Service Workers, Web Workers, and WebSockets**.

## 🚀 Live Project

**Live URL:**
https://bhumikam925.github.io/50-days-web-dev-challenge-/

## 📌 Project Overview

Synexus is a responsive web platform that demonstrates a complete modern frontend architecture using vanilla JavaScript.

The application includes:

* Single Page Application (SPA) navigation
* Reusable Web Components
* Reactive global state management
* Offline data storage using IndexedDB
* GitHub API integration
* Retry-enabled API requests
* Infinite data loading
* Service Worker caching
* Offline support
* Web Worker processing
* WebSocket-based live updates
* Custom modal components
* Task management interface
* Initiative proposal management
* Responsive UI with light/dark theme support

## 🏗️ Architecture

The project follows a modular frontend architecture.

```text
synexus-capstone/
│
├── index.html
├── style.css
├── main.js
├── api.js
├── db.js
├── router.js
├── sw.js
├── worker.js
├── websocket.js
├── utils.js
├── README.md
│
├── components/
│   ├── UserCard.js
│   ├── DataFeed.js
│   ├── CustomModal.js
│   ├── CartCounter.js
│   └── ProductButton.js
│
└── core/
    └── store.js
```

### Core Modules

**`index.html`**
Provides the application structure, navigation, forms, sections, templates, and Web Components.

**`style.css`**
Contains the global styling, responsive layouts, theme variables, animations, grids, and component styling.

**`main.js`**
Acts as the main application controller. It connects UI interactions, API functionality, state management, IndexedDB, routing, Web Components, and other application features.

**`api.js`**
Handles external API requests and GitHub data fetching using retry-enabled requests and parallel processing with `Promise.all()`.

**`router.js`**
Provides client-side SPA navigation using the browser History API without requiring full-page reloads.

**`db.js`**
Provides IndexedDB functionality for storing and retrieving data locally, supporting offline usage.

**`core/store.js`**
Implements a Pub/Sub-based global state store that allows components to subscribe to state changes and react to updates.

**`sw.js`**
Implements Service Worker functionality for caching core application assets and improving offline availability.

**`worker.js`**
Handles background processing using the Web Worker API so computational work can be performed separately from the main UI thread.

**`websocket.js`**
Handles WebSocket communication for live data updates.

## 🧩 Web Components

The application uses reusable custom elements built with the Web Components API.

### User Card

```html
<user-card name="Jane Doe" role="Lead Engineer"></user-card>
```

### Data Feed

```html
<data-feed></data-feed>
```

### Custom Modal

```html
<custom-modal></custom-modal>
```

### Reactive Components

The project also includes components such as:

* `CartCounter`
* `ProductButton`

These components communicate through the global state store and update reactively when the state changes.

## 💾 State Management

Global application state is managed using a custom `StateStore`.

The store supports:

* Initial state
* Subscriptions
* State updates
* Listener notifications
* Unsubscription

This allows independent Web Components to respond to shared state changes without tightly coupling them together.

## 📦 Offline Storage

IndexedDB is used as a client-side database.

The application can store information locally when online submission is unavailable and retrieve previously stored data when needed.

This provides a basic offline-first experience for important user data.

## 🌐 API Integration

The application integrates external data sources through modular API functions.

The API layer includes:

* Retry-enabled requests
* GitHub API integration
* Parallel requests using `Promise.all()`
* JSON response handling
* Error handling

## 🧭 SPA Routing

The application uses client-side routing with the browser History API.

Supported routes include:

```text
/
 /about
 /initiatives
 /team
 /github
 /contact
```

Navigation occurs without a full page reload.

## ⚡ Performance & Offline Features

The project uses several browser APIs to improve performance and reliability:

* Service Workers
* IndexedDB
* Web Workers
* WebSockets
* Lazy/infinite data loading
* API retry logic
* Cached core assets

## 🎨 UI & Responsiveness

The interface is designed to work across different screen sizes.

The UI includes:

* Responsive grids
* Mobile-friendly navigation
* Light and dark themes
* Loading indicators
* Error messages
* Interactive cards
* Modals
* Forms
* Task boards

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* Web Components
* Shadow DOM
* Custom Elements
* IndexedDB
* Service Worker API
* Web Worker API
* WebSocket API
* GitHub REST API
* Browser History API
* Git & GitHub

## 🧠 Problems Solved

During development, several practical frontend challenges were addressed:

### 1. Component Reusability

Reusable Web Components were created to avoid repeatedly writing the same UI structures.

### 2. Shared State

A centralized state store was implemented so multiple components could communicate through shared application state.

### 3. Offline Data

IndexedDB was introduced to preserve important data locally when network requests fail.

### 4. Network Reliability

API requests use retry logic and error handling to make external requests more reliable.

### 5. SPA Navigation

Client-side routing was implemented to provide navigation without unnecessary page reloads.

### 6. Offline Availability

A Service Worker caches important application assets so the application can continue working when network connectivity is unavailable.

### 7. Background Processing

Web Workers allow background processing without blocking the main UI thread.

### 8. Live Updates

WebSocket functionality demonstrates real-time communication between the client and server.

## ▶️ How to Use

### 1. Clone the repository

```bash
git clone <your-capstone-repository-url>
```

### 2. Open the project

Open the project folder in a code editor.

### 3. Run the application

Because the project uses JavaScript modules and browser APIs, it is recommended to run it through a local development server.

For example, using VS Code with Live Server:

```text
Open index.html → Start Live Server
```

### 4. Explore the application

Use the navigation menu to explore:

* Home
* About
* Initiatives
* Core Team
* GitHub
* Contact

You can also test the interactive components, API features, task management, offline storage, and other browser-based functionality.

## 📚 Learning Outcomes

This project demonstrates practical understanding of:

* Modular JavaScript architecture
* Modern browser APIs
* Component-based frontend development
* State management
* Asynchronous programming
* API integration
* Offline-first concepts
* SPA architecture
* Progressive Web App concepts
* Performance and user experience considerations

## 👩‍💻 Developer

**Boomi**

Developed as the final Phase 5 Capstone for the **Synexus 50-Day Web Development Challenge**.

## 📄 License

This project was created for educational and learning purposes as part of the Synexus Web Development Challenge.
