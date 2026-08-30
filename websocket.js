// ======================================================
// SYNEXUS WEBSOCKET - DAY 38
// ======================================================

const socket =
    new WebSocket(
        "wss://ws.postman-echo.com/raw"
    );
// ======================================================
// WEBSOCKET EVENTS
// ======================================================

socket.onopen = function () {

    console.log("WebSocket connection established.");

};


socket.onmessage = function (event) {

    const liveFeed =
        document.getElementById("live-feed");

    if (liveFeed) {

        liveFeed.innerHTML += `
            <p>${event.data}</p>
        `;

    }

};


socket.onerror = function (error) {

    console.error(
        "WebSocket error:",
        error
    );

};


socket.onclose = function () {

    console.log(
        "WebSocket connection closed."
    );
  // ======================================================
// SEND LIVE MESSAGE
// ======================================================

export function sendLiveMessage(text) {

    socket.send(text);

}

};
