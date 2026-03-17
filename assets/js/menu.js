// Menu Rendering Logic
// GLOBAL DATA (Enriched for AI Chatbot)

const MENU_DATA = [
    {
        "category": "Starters",
        "items": [
            { "id": "1", "name": "Satay Gai", "price": "7.00", "description": "Marinated chicken skewers with aromatic herbs, peanut sauce, and cucumber.", "ingredients": ["Chicken", "peanuts", "coconut milk", "curry", "sugar", "vinegar", "cucumber", "garlic"], "allergens": ["Peanuts", "Soy"] },
            { "id": "2", "name": "Satay Goong", "price": "8.00", "description": "Marinated prawn skewers with peanut sauce, and cucumber.", "ingredients": ["Prawns", "peanuts", "coconut milk", "curry", "cucumber", "garlic"], "allergens": ["Crustaceans", "Peanuts", "Soy"] },
            { "id": "3", "name": "Poa Pia Thod (Spring Rolls)", "price": "7.00", "description": "Spring rolls with sweet chili sauce.", "ingredients": ["Carrot", "cabbage", "onion", "rice noodles", "rice paper"], "allergens": ["Soy", "Gluten (traces)"] },
            { "id": "4", "name": "Samosa", "price": "7.00", "description": "Triangle flaky pastry filled with minced chicken, potato, and vegetables.", "ingredients": ["Chicken", "potato", "carrot", "peas", "spices"], "allergens": ["Gluten (traces)"] },
            { "id": "5", "name": "Tao Hoo Thod", "price": "7.50", "description": "Fried tofu with sweet chili sauce and peanuts.", "ingredients": ["Tofu", "peanuts", "sweet chili sauce", "garlic"], "allergens": ["Soy", "Peanuts"] },
            { "id": "6", "name": "Thod Mann Plaa (Fish Cake)", "price": "7.50", "description": "Spiced fish cakes with cucumber and peanuts.", "ingredients": ["White fish", "egg", "red curry", "green beans", "cucumber", "peanuts"], "allergens": ["Fish", "Egg", "Peanuts"] },
            { "id": "7", "name": "Mixed Starters (2 Pers)", "price": "19.50", "description": "Assorted platter: Satay, Spring Rolls, Fish Cake, etc.", "ingredients": ["Combination of previous starters"], "allergens": ["Crustaceans", "Fish", "Peanuts", "Soy", "Egg", "Gluten"] }
        ]
    },
    {
        "category": "Soups",
        "items": [
            { "id": "8", "name": "Tom Yum Hed", "price": "8.00", "description": "Spicy and sour mushroom soup.", "ingredients": ["Mushrooms", "lemongrass", "kaffir lime", "chili", "lime juice"], "allergens": [] },
            { "id": "9", "name": "Tom Kha Hed", "price": "8.00", "description": "Mushroom soup with coconut milk.", "ingredients": ["Mushrooms", "coconut milk", "galangal", "lemongrass"], "allergens": [] },
            { "id": "10", "name": "Tom Yam Goong", "price": "9.00", "description": "Traditional spicy soup with prawns.", "ingredients": ["Prawns", "mushrooms", "tomato", "chili", "lemongrass"], "allergens": ["Crustaceans"] },
            { "id": "11", "name": "Tom Kha Goong", "price": "9.00", "description": "Coconut soup with prawns.", "ingredients": ["Prawns", "coconut milk", "galangal", "lemongrass"], "allergens": ["Crustaceans"] },
            { "id": "12", "name": "Tom Yam Gai", "price": "8.50", "description": "Traditional spicy soup with chicken.", "ingredients": ["Chicken", "mushrooms", "chili", "lime"], "allergens": [] },
            { "id": "13", "name": "Tom Kha Gai", "price": "8.50", "description": "Chicken soup with coconut milk.", "ingredients": ["Chicken", "coconut milk", "galangal", "lemongrass"], "allergens": [] }
        ]
    },
    {
        "category": "Salads",
        "items": [
            { "id": "14", "name": "Som Tam", "price": "12.50", "description": "Green papaya salad.", "ingredients": ["Green papaya", "cherry tomato", "green beans", "garlic", "chili", "lime"], "allergens": [] },
            { "id": "15", "name": "Laab Salmon", "price": "10.50", "description": "Fresh salmon salad.", "ingredients": ["Salmon", "lime", "cilantro", "mint", "red onion"], "allergens": ["Fish"] },
            { "id": "16", "name": "Laab Gai", "price": "11.00", "description": "Minced chicken salad.", "ingredients": ["Chicken", "fresh herbs", "lime", "chili"], "allergens": [] },
            { "id": "17", "name": "Pra Goong", "price": "13.50", "description": "Spicy prawn salad.", "ingredients": ["Prawns", "lemongrass", "chili", "kaffir lime"], "allergens": ["Crustaceans"] },
            { "id": "18", "name": "Yam Woon Sen", "price": "13.50", "description": "Salad with glass noodles.", "ingredients": ["Rice noodles", "prawns", "chicken", "mushrooms"], "allergens": ["Crustaceans"] }
        ]
    },
    {
        "category": "Chicken or Beef",
        "description": "Choose your protein: Chicken or Beef",
        "items": [
            { "id": "19", "name": "Kaeng Panang", "price": "12.00 / 13.00", "description": "Rich and creamy Panang curry.", "ingredients": ["Coconut milk", "panang curry", "peanuts"], "allergens": ["Peanuts"] },
            { "id": "20", "name": "Kaeng Massaman", "price": "12.00 / 13.00", "description": "Mild Massaman curry with potatoes.", "ingredients": ["Potatoes", "coconut milk", "peanuts", "tamarind sauce"], "allergens": ["Peanuts"] },
            { "id": "21", "name": "Kaeng Phed (Red Curry)", "price": "12.00 / 13.00", "description": "Red curry with eggplant.", "ingredients": ["Coconut milk", "red curry", "eggplant", "basil"], "allergens": [] },
            { "id": "22", "name": "Phad Khing", "price": "12.00 / 13.00", "description": "Ginger stir-fry.", "ingredients": ["Ginger", "chives", "soy sauce", "mushrooms"], "allergens": ["Soy"] },
            { "id": "23", "name": "Phad Kapraw", "price": "12.00 / 13.00", "description": "Spicy stir-fry with basil.", "ingredients": ["Thai basil", "chili", "garlic", "beans"], "allergens": [] },
            { "id": "24", "name": "Phad Med Mamuang", "price": "12.00 / 13.00", "description": "Cashew nut stir-fry.", "ingredients": ["Cashews", "onion", "bell pepper", "special sauce"], "allergens": ["Nuts"] },
            { "id": "25", "name": "Kaeng Karee (Yellow Curry)", "price": "12.00 / 13.00", "description": "Mild yellow curry.", "ingredients": ["Coconut milk", "yellow curry", "potatoes", "onion"], "allergens": [] },
            { "id": "26", "name": "Kae Par (Jungle Curry)", "price": "12.00 / 13.00", "description": "Red curry jungle style (without coconut milk).", "ingredients": ["Mixed vegetables", "red curry", "spices", "chili"], "allergens": [] },
            { "id": "27", "name": "Kaeng Kaew Whan (Green Curry)", "price": "12.00 / 13.00", "description": "Aromatic green curry.", "ingredients": ["Coconut milk", "green curry", "bamboo", "basil"], "allergens": [] }
        ]
    },
    {
        "category": "Lamb",
        "items": [
            { "id": "28", "name": "Kae Kratheam", "price": "14.50", "description": "Lamb with garlic and pepper.", "ingredients": ["Lamb", "garlic", "black pepper", "cilantro"], "allergens": [] },
            { "id": "29", "name": "Kaeng Karee Kae", "price": "14.50", "description": "Lamb in yellow curry.", "ingredients": ["Lamb", "coconut milk", "potatoes", "yellow curry"], "allergens": [] },
            { "id": "30", "name": "Massaman Kae", "price": "14.50", "description": "Traditional Lamb Massaman.", "ingredients": ["Lamb", "coconut milk", "potatoes", "peanuts"], "allergens": ["Peanuts"] },
            { "id": "31", "name": "Kapraw Kae", "price": "14.50", "description": "Lamb with spicy basil.", "ingredients": ["Lamb", "basil", "chili", "green beans"], "allergens": [] }
        ]
    },
    {
        "category": "Duck",
        "items": [
            { "id": "32", "name": "Ped Laad Prik", "price": "17.50", "description": "Duck with sweet chili sauce.", "ingredients": ["Duck", "sweet chili sauce", "basil"], "allergens": ["Soy"] },
            { "id": "33", "name": "Ped Krob Lemongrass", "price": "17.50", "description": "Crispy duck Lemongrass style.", "ingredients": ["Duck", "stir-fried vegetables", "lemongrass", "special sauce"], "allergens": ["Soy"] },
            { "id": "34", "name": "Ped Kratheam", "price": "18.50", "description": "Duck with garlic and pepper.", "ingredients": ["Duck", "garlic", "pepper"], "allergens": [] },
            { "id": "35", "name": "Ped Pad Pak", "price": "18.50", "description": "Duck stir-fry with vegetables.", "ingredients": ["Duck", "fresh vegetables", "soy sauce"], "allergens": ["Soy"] },
            { "id": "36", "name": "Ped Wine Daeng", "price": "18.50", "description": "Duck in red wine.", "ingredients": ["Duck", "red wine", "spices"], "allergens": ["Sulphites"] },
            { "id": "37", "name": "Kaeng Phed Ped Yang", "price": "18.50", "description": "Red roasted duck curry.", "ingredients": ["Duck", "coconut milk", "red curry", "bamboo", "lychee", "pineapple"], "allergens": [] }
        ]
    },
    {
        "category": "Fish & Seafood",
        "items": [
            { "id": "38", "name": "Chu Chee Goong", "price": "19.00", "description": "Fried prawns in red curry and coconut milk sauce.", "ingredients": ["Prawns", "red curry", "coconut milk"], "allergens": ["Crustaceans"] },
            { "id": "47", "name": "Chu-Chee Pla", "price": "19.50", "description": "Fried Sea Bream in red curry and coconut milk.", "ingredients": ["Sea bream (fish)", "red curry", "coconut milk", "kaffir lime"], "allergens": ["Fish"] }
        ]
    },
    {
        "category": "Rice & Noodles",
        "items": [
            { "id": "48", "name": "Khao Phad Pak", "price": "6.00", "description": "Fried rice with vegetables.", "ingredients": ["Rice", "mixed vegetables", "soy"], "allergens": ["Soy"] },
            { "id": "49", "name": "Kao Souy", "price": "4.00", "description": "White Jasmine rice.", "ingredients": ["Jasmine rice"], "allergens": [] },
            { "id": "50", "name": "Kao Maan Kati", "price": "5.00", "description": "Coconut rice.", "ingredients": ["Jasmine rice", "coconut milk", "sesame"], "allergens": ["Sesame (possible)"] },
            { "id": "51", "name": "Sticky Rice", "price": "5.00", "description": "Traditional sticky rice.", "ingredients": ["Sticky rice"], "allergens": [] },
            { "id": "52", "name": "Fried Rice with Eggs", "price": "5.50", "description": "Egg fried rice.", "ingredients": ["Rice", "egg", "chives"], "allergens": ["Egg"] },
            { "id": "53", "name": "Pineapple Fried Rice", "price": "11.50", "description": "Fried rice with chicken and pineapple.", "ingredients": ["Rice", "chicken", "pineapple", "egg", "raisins", "cashews"], "allergens": ["Egg", "Nuts"] },
            { "id": "54", "name": "Phad Thai Gai", "price": "12.50", "description": "Rice noodles with chicken (Classic).", "ingredients": ["Rice noodles", "chicken", "egg", "peanuts", "bean sprouts", "tamarind"], "allergens": ["Egg", "Peanuts", "Soy"] },
            { "id": "55", "name": "Phad Thai Goong Sod", "price": "13.50", "description": "Rice noodles with prawns.", "ingredients": ["Rice noodles", "prawns", "egg", "peanuts", "tamarind"], "allergens": ["Crustaceans", "Egg", "Peanuts"] },
            { "id": "56", "name": "Phad See Ew Gai", "price": "12.50", "description": "Wide rice noodles with chicken.", "ingredients": ["Rice noodles", "chicken", "vegetables", "dark soy sauce"], "allergens": ["Soy"] },
            { "id": "57", "name": "Phad See Ew Goong", "price": "14.50", "description": "Wide rice noodles with prawns.", "ingredients": ["Rice noodles", "prawns", "vegetables", "soy sauce"], "allergens": ["Crustaceans", "Soy"] },
            { "id": "58", "name": "Guey Taew Phad Khi Mao", "price": "12.50", "description": "Spicy 'drunken' noodles with chicken.", "ingredients": ["Rice noodles", "chicken", "chili", "basil", "fresh pepper"], "allergens": ["Soy"] },
            { "id": "59", "name": "Guey Taew Plao", "price": "6.00", "description": "Special plain boiled noodles.", "ingredients": ["Rice noodles"], "allergens": [] },
            { "id": "60", "name": "Chips / Fries", "price": "3.50", "description": "Portion of chips/fries.", "ingredients": ["Potato", "vegetable oil", "salt"], "allergens": [] }
        ]
    }
];

// 2. RENDERING LOGIC
window.MenuApp = {
    allData: [],

    init: async function () {
        const container = document.getElementById('menu-container');
        if (!container) return; // Not on menu page

        try {
            // Load data synchronously
            this.allData = MENU_DATA;
            this.render(this.allData);

            // Trigger filter init if exists
            if (window.FilterApp) {
                window.FilterApp.init(this.allData);
            }
        } catch (e) {
            console.error('Error rendering menu:', e);
            container.innerHTML = '<p class="error">Unexpected error processing the menu. ' + e.message + '</p>';
        }
    },

    render: function (data) {
        console.log("Rendering menu with data:", data);
        const container = document.getElementById('menu-container');
        if (!container) return;

        try {
            container.innerHTML = ''; // Clear loading spinner

            data.forEach(category => {
                const catSection = document.createElement('section');
                catSection.className = 'menu-category';

                // Create Title
                const title = document.createElement('h2');
                title.className = 'menu-category-title';
                title.textContent = category.category;

                const grid = document.createElement('div');
                grid.className = 'menu-grid';

                category.items.forEach(item => {
                    const card = document.createElement('article');

                    card.className = 'menu-item'; // Standard white card
                    card.innerHTML = `
                    <span class="category-badge">${category.category}</span>
                    
                    <h3>${item.name}</h3>
                    ${item.subtitle ? `<p class="item-subtitle">${item.subtitle}</p>` : `<p class="item-subtitle">${item.name}</p>`}
                    
                    ${item.description ? `<p class="item-description">${item.description}</p>` : ''}
                    
                    <span class="price">${item.price}€</span>
                `;
                    grid.appendChild(card);
                });

                catSection.appendChild(title);
                if (category.description) {
                    const p = document.createElement('p');
                    p.textContent = category.description;
                    p.style.marginBottom = '1.5rem';
                    catSection.appendChild(p);
                }
                catSection.appendChild(grid);
                container.appendChild(catSection);
            });

        } catch (e) {
            console.error('Error rendering menu:', e);
            container.innerHTML = '<p class="error">Error loading the menu. Please try refreshing.</p>';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.MenuApp.init();
});
