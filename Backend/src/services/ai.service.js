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

    // Retry only temporary 503 errors
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {

            const response = await ai.models.generateContent({
                model: "gemini-3.8-flash",
                contents: prompt
            });

            return response.text;

        } catch (error) {

            console.error(
                `Gemini attempt ${attempt} failed:`,
                error.message
            );

            // Get status code
            let statusCode = error?.status;

            try {
                const parsedError = JSON.parse(error.message);
                statusCode = parsedError?.error?.code || statusCode;
            } catch (e) {
                // message was not JSON
            }

            // 429 = quota exceeded
            // Don't retry because another request can make the quota problem worse
            if (statusCode === 429) {
                throw error;
            }

            // Retry only when Gemini is temporarily unavailable
            if (statusCode !== 503) {
                throw error;
            }

            // Last attempt
            if (attempt === 3) {
                throw error;
            }

            // Wait before retrying
            await new Promise(resolve =>
                setTimeout(resolve, attempt * 5000)
            );
        }
    }
}

module.exports = generateContent;