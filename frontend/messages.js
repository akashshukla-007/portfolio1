// API Configuration - Replace with your deployed backend URL
const API_URL = 'https://portfolio-backend-xxxx.onrender.com'; // Change this to your backend URL

// DOM Elements
const messagesContainer = document.getElementById('messagesContainer');
const loadingEl = document.getElementById('loading');
const totalMessagesEl = document.getElementById('totalMessages');
const todayMessagesEl = document.getElementById('todayMessages');

// Fetch and display messages
async function fetchMessages() {
    try {
        const response = await fetch(`${API_URL}/api/messages`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            displayMessages(data.data);
            updateStats(data.data);
        } else {
            showNoMessages();
        }

        loadingEl.style.display = 'none';
    } catch (error) {
        console.error('Error fetching messages:', error);
        showError();
        loadingEl.style.display = 'none';
    }
}

// Display messages
function displayMessages(messages) {
    messagesContainer.innerHTML = '';

    messages.forEach(message => {
        const messageCard = createMessageCard(message);
        messagesContainer.appendChild(messageCard);
    });
}

// Create message card
function createMessageCard(message) {
    const card = document.createElement('div');
    card.className = 'message-card';
    card.innerHTML = `
        <div class="message-header">
            <div class="message-sender">
                <h3><i class="fas fa-user"></i> ${message.name}</h3>
                <p><i class="fas fa-envelope"></i> ${message.email}</p>
            </div>
            <div class="message-actions">
                <span class="message-date">
                    <i class="fas fa-calendar-alt"></i>
                    ${formatDate(message.createdAt)}
                </span>
                <button class="btn-delete" onclick="deleteMessage('${message._id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
        <div class="message-subject">
            <h4><i class="fas fa-tag"></i> Subject:</h4>
            <p>${message.subject}</p>
        </div>
        <div class="message-body">
            <p>${message.message}</p>
        </div>
    `;
    return card;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// Update statistics
function updateStats(messages) {
    totalMessagesEl.textContent = messages.length;

    const today = new Date().toDateString();
    const todayCount = messages.filter(msg => {
        const msgDate = new Date(msg.createdAt).toDateString();
        return msgDate === today;
    }).length;

    todayMessagesEl.textContent = todayCount;
}

// Delete message
async function deleteMessage(id) {
    if (!confirm('Are you sure you want to delete this message?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/messages/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            // Reload messages
            fetchMessages();
            alert('Message deleted successfully!');
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        alert('Failed to delete message. Please try again.');
    }
}

// Show no messages
function showNoMessages() {
    messagesContainer.innerHTML = `
        <div class="no-messages">
            <i class="fas fa-inbox"></i>
            <h3>No Messages Yet</h3>
            <p>You haven't received any messages from the contact form.</p>
        </div>
    `;
    totalMessagesEl.textContent = '0';
    todayMessagesEl.textContent = '0';
}

// Show error
function showError() {
    messagesContainer.innerHTML = `
        <div class="no-messages">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error Loading Messages</h3>
            <p>Failed to fetch messages. Please check your backend connection and try again.</p>
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchMessages();
});

// Auto-refresh messages every 30 seconds
setInterval(() => {
    fetchMessages();
}, 30000);
