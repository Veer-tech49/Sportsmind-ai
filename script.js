const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
  const question = userInput.value.trim();
  if (!question) return;

  // Show user message
  const userMsg = document.createElement('div');
  userMsg.classList.add('user-msg');
  userMsg.innerHTML = `<strong>You:</strong> ${question}`;
  chatBox.appendChild(userMsg);

  userInput.value = '';

  // Show AI typing
  const aiMsg = document.createElement('div');
  aiMsg.classList.add('ai-msg');
  aiMsg.innerHTML = `<strong>SportsMind AI:</strong> Typing...`;
  chatBox.appendChild(aiMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    // Call Vercel proxy
    const response = await fetch("https://YOUR-VERCEL-URL.vercel.app/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    aiMsg.innerHTML = `<strong>SportsMind AI:</strong> ${data.answer}`;
  } catch (err) {
    aiMsg.innerHTML = `<strong>SportsMind AI:</strong> Error fetching answer.`;
    console.error(err);
  }
});
