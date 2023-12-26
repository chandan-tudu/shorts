const rootEl = document.documentElement;
const bodyEl = document.querySelector('body');
const headEl = document.querySelector('head');
const themeBtn = document.querySelector('.theme-btn');
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const pageTheme = localStorage.getItem('page-theme');

const colorsTheme = [
    ['261.3559322034deg', '42.4460431655%', '27.2549019608%'],
    ['231.4285714286deg', '17.0731707317%', '8.0392156863%'],
    ['224.2105263158deg', '24.0506329114%', '15.4901960784%'],
    ['320.2702702703deg', '97.3684210526%', '14.9019607843%'],
    ['149.552238806deg', '48.9051094891%', '26.862745098%'],
];

const createEl = (type, attr = {}) => {
    const el = document.createElement(type);
    for (i in attr) {
        el.setAttribute(i, attr[i]);
    }
    return el;
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const theTheme = colorsTheme[getRandomInt(0, 4)];
if (Array.isArray(theTheme) && theTheme.length === 3) {
    document.documentElement.style.setProperty('--primary-hue', theTheme[0]);
    document.documentElement.style.setProperty(
        '--primary-saturation',
        theTheme[1]
    );
    document.documentElement.style.setProperty(
        '--primary-lightness',
        theTheme[2]
    );
}

// Load Scripts
(function () {
    const findPreEl = document.querySelector("pre[class*='language-']");
    if (findPreEl) {
        const prismScript = createEl('script', {
            src: 'https://cdn.jsdelivr.net/gh/chandan-tudu/docs@master/assets/prism.js',
        });
        const prismStyle = createEl('link', {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/gh/chandan-tudu/docs@master/assets/prism.min.css',
        });

        headEl.insertAdjacentElement('beforeend', prismStyle);
        bodyEl.insertAdjacentElement('beforeend', prismScript);
    }

    const gTag = createEl('script', {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-1EGRP1HSLV',
    });
    const gTagCode = createEl('script', {
        src: 'https://cdn.jsdelivr.net/gh/chandan-tudu/docs@master/assets/analytics.js',
    });
    bodyEl.insertAdjacentElement('beforeend', gTag);
    bodyEl.insertAdjacentElement('beforeend', gTagCode);
})();

if (document.cookie.indexOf('DevBDocsCookie=1')) {
    const consentDiv = createEl('div', {
        class: 'gdpr-msg',
    });
    const privacyLink = createEl('a', {
        href: 'https://www.devbabu.com/privacy-policy/',
    });
    privacyLink.innerText = 'Privacy';
    const acceptBtn = createEl('button');
    acceptBtn.innerText = 'Accept';
    acceptBtn.addEventListener('click', () => {
        document.cookie = 'DevBDocsCookie=1; max-age=' + 60 * 60 * 24 * 30;
        if (document.cookie) {
            consentDiv.style.display = 'none';
        } else {
            alert("Cookie Can't be set!");
        }
    });

    consentDiv.innerText =
        'We use cookies to ensure that we give you the best experience on our website.';
    consentDiv.appendChild(privacyLink);
    consentDiv.appendChild(acceptBtn);
    bodyEl.insertAdjacentElement('beforeend', consentDiv);
}

const changeTheme = () => {
    if (rootEl.hasAttribute('dark-theme')) {
        rootEl.toggleAttribute('dark-theme');
        localStorage.setItem('page-theme', 'light');
        themeBtn.classList.remove('dark');
        return;
    }
    rootEl.toggleAttribute('dark-theme');
    localStorage.setItem('page-theme', 'dark');
    themeBtn.classList.add('dark');
};

themeBtn.addEventListener('click', changeTheme);

if (pageTheme === 'dark') {
    rootEl.setAttribute('dark-theme', true);
    themeBtn.classList.add('dark');
}

function handleDarkModeChange(e) {
    if (pageTheme) return;
    if (e.matches) {
        rootEl.setAttribute('dark-theme', true);
        themeBtn.classList.add('dark');
    }
}

darkModeQuery.addEventListener('change', handleDarkModeChange);
handleDarkModeChange(darkModeQuery);
