const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Example AI responses for testing
const sampleAnswers = [
  "Virat Kohli scored 122 runs in his last match!",
  "Cristiano Ronaldo has 700+ career goals.",
  "India beat Australia by 6 wickets in the last T20.",
  "Lionel Messi has 30 assists in the last season.",
  "This match looks like a high-scoring thriller!"
];

sendBtn.addEventListener('click', () => {
  const question = userInput.value.trim();
  if (!question) return;

  // Add user's message
  appendMessage('You', question, 'user-msg');
  userInput.value = '';

  // Add AI typing effect
  appendMessage('SportsMind AI', 'Typing...', 'ai-msg');

  // Simulate AI response delay
  setTimeout(() => {
    const answer = getAIResponse(question);
    chatBox.lastChild.innerHTML = `<strong>SportsMind AI:</strong> ${answer}`;
  }, 1000 + Math.random() * 1000); // 1-2 seconds delay
});

// Function to append messages
function appendMessage(sender, message, cls) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add(cls);
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to simulate AI response
function getAIResponse(question) {
  // Randomly pick a sample answer (can customize later)
  const randomIndex = Math.floor(Math.random() * sampleAnswers.length);
  return sampleAnswers[randomIndex];
}
