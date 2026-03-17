const Groq = require("groq-sdk");

// Allow CORS
const adjustCors = (res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
};

// Menu Context (Simplified for AI efficiency)
const MENU_CONTEXT = [
    { category: "Starters", items: "Satay Gai (Chicken, peanuts), Satay Goong (Prawns, peanuts), Spring Rolls (Veg, Soy), Samosa (Chicken, gluten), Fried Tofu, Fish Cake (Fish, egg)" },
    { category: "Soups", items: "Tom Yum (Spicy, Prawns/Chicken), Tom Kha (Coconut, Prawns/Chicken/Mushrooms)" },
    { category: "Salads", items: "Som Tam (Papaya), Laab (Minced Meat/Salmon), Yam Woon Sen (Noodles)" },
    { category: "Curries & Meats (Chicken/Beef/Duck/Lamb)", items: "Panang (Peanuts), Massaman (Potato, Peanuts), Red Curry, Green Curry, Yellow Curry, Ginger Stir-fry, Basil Stir-fry (Kapraw), Cashews (Nuts)" },
    { category: "Rice & Noodles", items: "Pad Thai (Peanuts, Egg), Pad See Ew (Soy), Fried Rice, Jasmine Rice, Sticky Rice" },
    { note: "Key Allergens: Peanuts in Satay/PadThai/Massaman. Soy in almost all stir-fries. Gluten in battered items/dark sauces. Crustaceans in prawn dishes." }
];

module.exports = async (req, res) => {
    adjustCors(res);

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Robust Body Parsing
        let body = req.body;
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {
                return res.status(400).json({ error: 'Invalid JSON body' });
            }
        }
        if (!body || !body.message) {
            return res.status(400).json({ error: 'Missing "message" in request body' });
        }

        const { message } = body;
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            console.error("GROQ_API_KEY missing");
            return res.status(500).json({ error: 'Server Config Error: Missing GROQ_API_KEY' });
        }

        const groq = new Groq({ apiKey: apiKey });

        const systemPrompt = `
        You are an expert waiter at "Lemongrass Fusion".
        Use this menu data to recommend and answer questions about allergens:
        ${JSON.stringify(MENU_CONTEXT)}
        
        Rules:
        1. Be friendly and concise.
        2. If they ask about allergens, check the list scrupulously.
        3. If it's not on the list, say we don't have it.
        4. ALWAYS respond in the SAME LANGUAGE the user is using. If they speak Spanish, respond in Spanish. If they speak French, respond in French, etc.
        5. ONLY append the token [RESERVE_ACTION] if the user makes a concrete and final decision to book a table or place an order (e.g., "I want to book for tonight", "I'm ready to order now"). DO NOT append it for simple greetings, general menu curiosity, or initial inquiries. Be strict.
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            model: "llama-3.3-70b-versatile", // Current supported model
            temperature: 0.5,
            max_tokens: 200,
        });

        const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't think of a response.";

        res.status(200).json({ reply: reply });

    } catch (error) {
        console.error('Groq API Error:', error);
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};
