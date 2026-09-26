const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY
});

async function generateContent(code) {

    const prompt = `
You are a senior JavaScript developer and professional code reviewer.

Carefully review the JavaScript code provided below.

CODE TO REVIEW:
${code}

Provide a clear, detailed but concise code review using the following structure:

## 🔴 1. Bugs & Errors
Identify all important syntax errors, runtime errors, logical errors, or incorrect behavior.

For each important issue:
- Clearly mention what is wrong.
- Explain why it happens.
- Explain what could happen if it is not fixed.

If there are no critical bugs, say:
"No critical bugs found."

## 🟡 2. Code Quality
Review the code for:
- Readability
- Naming
- Formatting and indentation
- Code structure
- Maintainability
- JavaScript best practices

Explain the most important issues with short examples where useful.

## 🔵 3. Improvements
Suggest practical improvements that would make the code:
- Cleaner
- More readable
- More reliable
- Easier to maintain

Explain why each improvement is useful.

## 🟢 4. Corrected Code
Provide a clean and improved version of the code.

Only change things that actually need improvement.
Keep the solution understandable for a beginner.

## 💡 5. Developer Tip
Give 2-3 useful tips related specifically to the mistakes or concepts found in this code.

IMPORTANT:
- Be professional and constructive.
- Explain technical concepts in simple language.
- Do not invent errors.
- Do not repeat the entire submitted code unnecessarily.
- Prioritize important problems over minor style preferences.
- Keep each section informative but not excessively long.
- Use Markdown formatting.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt
    });

    return response.text;
}

module.exports = generateContent;