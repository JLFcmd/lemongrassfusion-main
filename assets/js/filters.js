window.FilterApp = {
    init: function (data) {
        const container = document.getElementById('filters-container');
        if (!container) return;

        // Extract Categories
        const categories = data.map(cat => cat.category);

        container.innerHTML = '';

        // Render Checkboxes
        categories.forEach(cat => {
            const label = document.createElement('label');
            label.className = 'filter-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'filter-checkbox';
            checkbox.value = cat;
            checkbox.addEventListener('change', () => this.filterMenu());

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(cat));

            container.appendChild(label);
        });
    },

    filterMenu: function () {
        // Collect checked categories
        const checkboxes = document.querySelectorAll('.filter-checkbox:checked');
        const selectedCats = Array.from(checkboxes).map(cb => cb.value);

        const sections = document.querySelectorAll('.menu-category');

        sections.forEach(section => {
            const title = section.querySelector('.menu-category-title').textContent;
            if (selectedCats.length === 0 || selectedCats.includes(title)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }
};
