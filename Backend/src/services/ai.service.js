const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY
});

async function generateContent(code) {

    const prompt = `
You are a professional senior code reviewer.

Analyze this JavaScript code:

${code}

Give a clear code review with:
1. Bugs and errors
2. Code quality issues
3. Improvements
4. Corrected code
5. Short developer tips

Be accurate, professional and beginner-friendly.
`;

    // Retry up to 3 times if Gemini temporarily fails
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-3.8-flash",
                contents: prompt
            });

            return response.text;

        } catch (error) {

            console.error(`Gemini attempt ${attempt} failed:`, error.message);

            if (attempt === 3) {
                throw error;
            }

            // Wait before trying again
            await new Promise(resolve =>
                setTimeout(resolve, attempt * 2000)
            );
        }
    }
}

module.exports = generateContent;