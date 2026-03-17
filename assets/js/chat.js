document.addEventListener('DOMContentLoaded', () => {
    // Inject HTML structure if not present
    if (!document.getElementById('lemongrass-chat-widget')) {
        const widget = document.createElement('div');
        widget.id = 'lemongrass-chat-widget';
        widget.className = 'chat-widget';
        widget.innerHTML = `
            <button class="chat-toggle-btn" id="chat-toggle">
                <i class="fas fa-comment-dots"></i>
            </button>
            <div class="chat-window" id="chat-window">
                <div class="chat-header">
                    <h3>Lemongrass AI 🤖</h3>
                    <i class="fas fa-times" id="chat-close" style="cursor: pointer;"></i>
                </div>
                <div class="chat-messages" id="chat-messages">
                    <div class="message bot">
                        Hi! I'm your virtual assistant. 🍛<br>
                        Ask me about ingredients or recommendations.<br><br>
                        <strong>⚠️ Important:</strong> Always inform our staff about your allergies when ordering!
                    </div>
                </div>
                <div class="typing-indicator" id="chat-typing">Typing...</div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Type your question...">
                    <button class="chat-send-btn" id="chat-send"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        `;
        document.body.appendChild(widget);
    }

    // Logic
    const toggleBtn = document.getElementById('chat-toggle');
    const closeBtn = document.getElementById('chat-close');
    const chatWindow = document.getElementById('chat-window');
    const sendBtn = document.getElementById('chat-send');
    const input = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('chat-typing');

    // Toggle
    const toggleChat = () => chatWindow.classList.toggle('open');
    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Send Message
    const sendMessage = async () => {
        const text = input.value.trim();
        if (!text) return;

        // User Message
        appendMessage(text, 'user');
        input.value = '';

        // Bot Thinking
        typingIndicator.style.display = 'block';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            // Call Vercel API - Ensure endpoint is reachable
            const apiUrl = '/api/chat';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const textResponse = await response.text();
            let data;
            try {
                data = JSON.parse(textResponse);
            } catch (e) {
                console.error("Non-JSON response received:", textResponse);
                throw new Error(`Server error (${response.status}): Invalid response.`);
            }

            if (!response.ok) {
                throw new Error(data?.error || `Error ${response.status}`);
            }

            typingIndicator.style.display = 'none';

            if (data.reply) {
                let replyText = data.reply;
                const reserveTrigger = '[RESERVE_ACTION]';
                const shouldShowBooking = replyText.includes(reserveTrigger);

                if (shouldShowBooking) {
                    replyText = replyText.replace(reserveTrigger, '').trim();
                }

                appendMessage(replyText, 'bot');

                if (shouldShowBooking) {
                    appendBookingButtons();
                }
            } else if (data.error) {
                appendMessage('⚠️ System error: ' + data.error, 'bot');
            } else {
                appendMessage('Sorry, the server did not return a response.', 'bot');
            }

        } catch (error) {
            console.error("Chat Error Details:", error);
            typingIndicator.style.display = 'none';
            appendMessage('Connection error: ' + error.message, 'bot');
        }
    };

    function appendBookingButtons() {
        const container = document.createElement('div');
        container.className = 'message bot booking-actions';
        container.innerHTML = `
            <p style="margin-bottom: 0.8rem; font-weight: 600;">Choose how to book:</p>
            <a href="https://wa.me/34672533391?text=Hello%20Lemongrass,%20I%20would%20like%20to%20make%20a%20reservation..." target="_blank" class="booking-btn whatsapp">
                <i class="fab fa-whatsapp"></i> Book via WhatsApp
            </a>
            <a href="tel:+34672533391" class="booking-btn phone">
                <i class="fas fa-phone-alt"></i> Call +34 672 53 33 91
            </a>
        `;
        messagesContainer.appendChild(container);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function appendMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerHTML = text.replace(/\n/g, '<br>'); // Simple formatting
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
