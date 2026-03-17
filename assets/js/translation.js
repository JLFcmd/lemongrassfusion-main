document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject the Google Translate Script if not present
    if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
    }

    // 2. Create the Custom Widget HTML
    const widgetHTML = `
        <div class="custom-translate-widget">
            <div class="lang-options" id="langOptions">
                <button class="lang-option" onclick="changeLanguage('es')">
                    <span class="lang-flag">🇪🇸</span> <span class="lang-name">Español</span>
                </button>
                <button class="lang-option" onclick="changeLanguage('en')">
                    <span class="lang-flag">🇬🇧</span> <span class="lang-name">English</span>
                </button>
                <button class="lang-option" onclick="changeLanguage('th')">
                    <span class="lang-flag">🇹🇭</span> <span class="lang-name">Thai</span>
                </button>
                <button class="lang-option" onclick="changeLanguage('ja')">
                    <span class="lang-flag">🇯🇵</span> <span class="lang-name">Japanese</span>
                </button>
                <button class="lang-option" onclick="changeLanguage('zh-CN')">
                    <span class="lang-flag">🇨🇳</span> <span class="lang-name">Chinese</span>
                </button>
                 <button class="lang-option" onclick="changeLanguage('tl')">
                    <span class="lang-flag">🇵🇭</span> <span class="lang-name">Tagalog</span>
                </button>
            </div>
            <button class="lang-toggle-btn" id="langToggle" aria-label="Cambiar idioma">
                <i class="fas fa-globe"></i>
            </button>
        </div>
        <!-- Hidden Google Element -->
        <div id="google_translate_element" style="display:none;"></div>
    `;

    // Insert widget
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // 3. toggle logic
    const toggleBtn = document.getElementById('langToggle');
    const optionsPanel = document.getElementById('langOptions');

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        optionsPanel.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!optionsPanel.contains(e.target) && !toggleBtn.contains(e.target)) {
            optionsPanel.classList.remove('active');
        }
    });

    // 4. Initialize Google Translate
    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
            pageLanguage: 'es',
            includedLanguages: 'es,en,th,ja,tl,zh-CN',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
    };

    // 5. Change Language Function
    window.changeLanguage = function (langCode) {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event('change'));
            optionsPanel.classList.remove('active');
        } else {
            console.warn("Google Translate widget not ready yet.");
        }
    }
});
