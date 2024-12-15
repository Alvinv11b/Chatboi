const chatLog = document.getElementById('chat-log');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to send message
sendButton.addEventListener('click', async () => {
    const userMessage = messageInput.value.trim();
    if (!userMessage) return;

    chatLog.innerHTML += `<div>You: ${userMessage}</div><br>`;
    messageInput.value = '';

    try {
        const response = await fetch('http://localhost:5500/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        chatLog.innerHTML += `<div>Luxer T3 Bot: ${data.reply}</div><br>`;
    } catch (error) {
        chatLog.innerHTML += `<div>Error: ${error.message}</div>`;
    }
});

// Allow sending on "Enter" key press
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});