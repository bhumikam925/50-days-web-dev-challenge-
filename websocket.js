// ======================================================
// WEBSOCKET CONNECTION - DAY 38
// ======================================================

const socket = new WebSocket(
    "wss://ws.postman-echo.com/raw"
);


// ======================================================
// CONNECTION OPEN
// ======================================================

socket.onopen = function () {

    console.log(
        "WebSocket connection established."
    );

};


// ======================================================
// RECEIVE MESSAGE
// ======================================================

socket.onmessage = function (event) {

    const liveFeed =
        document.getElementById("live-feed");

    if (!liveFeed) {
        return;
    }

    const message =
        document.createElement("p");

    message.textContent =
        event.data;

    liveFeed.appendChild(message);

};


// ======================================================
// ERROR HANDLING
// ======================================================

socket.onerror = function (error) {

    console.error(
        "WebSocket error:",
        error
    );

};


// ======================================================
// CONNECTION CLOSED
// ======================================================

socket.onclose = function () {

    console.log(
        "WebSocket connection closed."
    );

};


// ======================================================
// SEND MESSAGE
// ======================================================

export function sendLiveMessage(text) {

    if (socket.readyState === WebSocket.OPEN) {

        socket.send(text);

    } else {

        console.log(
            "WebSocket is not connected."
        );

    }

}
