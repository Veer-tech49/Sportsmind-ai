const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
  const question = userInput.value.trim();
  if (!question) return;

  appendMessage('You', question, 'user-msg');
  userInput.value = '';
  appendMessage('SportsMind AI', 'Typing...', 'ai-msg');

  // Replace this with proxy URL if direct API fails
  fetchOpenAI(question);
});

function appendMessage(sender, message, cls) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add(cls);
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Call OpenAI API (use backend proxy for GitHub Pages)
async function fetchOpenAI(question) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are SportsMind AI. Answer ONLY cricket and football questions. Include stats, comparisons, predictions." },
          { role: "user", content: question }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;
    chatBox.lastChild.innerHTML = `<strong>SportsMind AI:</strong> ${answer}`;
  } catch (error) {
    chatBox.lastChild.innerHTML = `<strong>SportsMind AI:</strong> Error fetching answer. Use a proxy server.`;
    console.error(error);
  }
}
