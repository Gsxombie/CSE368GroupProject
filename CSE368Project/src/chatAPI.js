export async function askChatGPT(conversation, predefinedKnowledge = []) {
    const apiKey = '';

    try {
        const fullConversation = [...predefinedKnowledge, ...conversation];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: fullConversation,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error from OpenAI API:', errorData);
            return 'There was an error communicating with ChatGPT.';
        }

        const data = await response.json();
        const gptResponse = data.choices[0].message.content;

        await fetch('https://se-dev.cse.buffalo.edu/CSE442/2024-Fall/tli67/api/getResponses.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                user_message: conversation[conversation.length - 1].content,
                gpt_response: gptResponse,
            }),
        });

        return gptResponse;
    } catch (error) {
        console.error('Error from ChatGPT:', error);
        return 'There was an error communicating with ChatGPT.';
    }
}
