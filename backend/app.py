from flask import Flask, request, jsonify
import os
from google import genai
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'AIzaSyBYmATmIXh1gbMe2pYmSH_JvbuKvCgF4xM'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=2)

# Enable CORS manually
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Gemini API key
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set. Please set it before running the app.")

# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)

# Store conversation history per session
conversation_history = {}

# System prompt
SYSTEM_PROMPT = """You are an AI learning assistant for young students exploring artificial intelligence concepts.

MEMORY & CONTEXT:
You can remember previous messages in this conversation. Reference earlier topics when relevant to create continuity and personalized learning. If a student mentions their interests or asks follow-up questions, acknowledge what they said before.

CORE MISSION:
Help students understand AI through clear explanations and hands-on learning. Keep responses concise, organized, and actionable.

RESPONSE STRUCTURE:
When answering questions, follow this format:
1. Brief introduction (1-2 sentences) - acknowledge previous context if relevant
2. Main explanation with clear steps or points
3. Simple real-world example
4. One actionable next step or question

RESPONSE GUIDELINES:
- Keep answers under 200 words when possible
- Use simple language without excessive emojis
- Break complex ideas into 3-4 clear steps maximum
- Avoid long bullet point lists
- Focus on one concept at a time
- End with a single question or suggestion, not multiple options
- Reference previous parts of the conversation when relevant

AI TOPICS YOU COVER:
1. Chatbots & NLP: How AI understands and responds to human language
2. Image Recognition: How AI identifies objects and patterns in images
3. Classification: How AI sorts data into categories
4. Computer Vision: How AI interprets visual information

EXPLANATION STYLE:
- Start with a relatable analogy
- Explain in 3 simple steps
- Give ONE concrete example
- Suggest ONE hands-on activity
- Build on previous topics when the student is ready

TONE:
Friendly and encouraging, but professional. Treat students with respect for their intelligence.

EXAMPLE OF GOOD RESPONSE:
"A chatbot is like a smart conversation partner. Here's how it works:

1. It reads your message and breaks it into words
2. It figures out what you're asking using NLP (Natural Language Processing)
3. It finds or generates the best response

For example, when you ask 'What's the weather?', it recognizes you want weather information and retrieves it.

Want to try building a simple chatbot that answers questions about your favorite topic?"

Remember: Be concise, organized, focus on understanding over entertainment, and maintain conversation context to personalize the learning experience.
"""

# Function to generate content with Gemini API
def generate_content_with_gemini(prompt: str, chat_history: list):
    """Generate AI response using Gemini API with conversation context."""
    try:
        # Build conversation context
        conversation = ""
        for entry in chat_history:
            conversation += f"{entry['role']}: {entry['content']}\n"
        
        # Create full prompt with system instructions and context
        full_prompt = f"{SYSTEM_PROMPT}\n\nConversation History:\n{conversation}\nUser: {prompt}\nAI:"
        
        # Call Gemini API
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=full_prompt
        )
        
        return response.text

    except Exception as e:
        print(f"Error generating content: {str(e)}")
        return f"I apologize, but I encountered an error: {str(e)}"

# Route to handle chat
@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle incoming chat messages."""
    data = request.get_json()
    user_message = data.get('message')
    session_id = data.get('session_id', 'default')

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # Initialize session history if needed
    if session_id not in conversation_history:
        conversation_history[session_id] = []

    # Get chat history for this session
    chat_history = conversation_history[session_id]
    
    # Generate AI response
    ai_response = generate_content_with_gemini(user_message, chat_history)

    # Update conversation history
    chat_history.append({"role": "User", "content": user_message})
    chat_history.append({"role": "AI", "content": ai_response})

    # Keep only last 20 messages to manage memory
    if len(chat_history) > 20:
        chat_history = chat_history[-20:]
    
    conversation_history[session_id] = chat_history

    return jsonify({
        'message': ai_response, 
        'session_id': session_id
    })

# Route to clear conversation
@app.route('/api/chat/clear', methods=['POST'])
def clear_chat():
    """Clear conversation history for a session."""
    data = request.get_json()
    session_id = data.get('session_id', 'default')
    conversation_history[session_id] = []
    return jsonify({
        "message": "Chat history cleared", 
        "session_id": session_id
    })

# Route to get history
@app.route('/api/chat/history', methods=['GET'])
def get_history():
    """Retrieve conversation history for a session."""
    session_id = request.args.get('session_id', 'default')
    history = conversation_history.get(session_id, [])
    return jsonify({
        "history": history, 
        "session_id": session_id
    })

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    """Check if the API is running."""
    return jsonify({"status": "ok", "message": "API is running"})

if __name__ == '__main__':
    print("Starting Flask server...")
    print(f"API will be available at http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)