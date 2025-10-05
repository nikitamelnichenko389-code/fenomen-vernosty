// Главное приложение
class FenomenVernostiApp {
    constructor() {
        this.currentTheme = 'light';
        this.currentSection = 'about';
        this.isMenuOpen = false;
        this.lastScrollY = 0;
        this.isReadingMode = false;
        this.testAnswers = [];
        this.currentChapter = 1;
        this.totalChapters = 11;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupHidingHeader();
        this.restoreUserPreferences();
        this.setupScrollProgress();
        this.showNotification('Добро пожаловать на сайт "Феномен верности"!', 'info');
        
        console.log('🚀 Приложение "Феномен верности" запущено');
    }

    // ==================== ТАЙМЛАЙН ====================
    showTimelineDetail(year) {
        const timelineData = {
            2014: {
                title: "2014 год - Начало конфликта",
                description: "Ключевые события 2014 года, когда началось народное сопротивление в Донбассе.",
                heroes: {
                    zaharchenko: "Александр Захарченко активно участвует в организации обороны Донецка, становится одним из лидеров народного ополчения. Работает на координацию действий различных подразделений.",
                    motorola: "Арсен Павлов прибывает в Донбасс в августе 2014 года. Участвует в первых боях за освобождение населенных пунктов, проявляет себя как решительный и смелый командир.",
                    givi: "Михаил Толстых берет в руки оружие для защиты родного Иловайска. Участвует в уличных боях, становится одним из организаторов местной обороны."
                }
            },
            2015: {
                title: "2015 год - Бои за Донецк",
                description: "Интенсивные боевые действия вокруг Донецка и ключевые операции.",
                heroes: {
                    zaharchenko: "Возглавляет оборону Донецка, координирует действия различных подразделений. Участвует в переговорах и организации гражданской жизни в условиях блокады.",
                    motorola: "Командует подразделением 'Спарта' в боях за донецкий аэропорт. Становится одним из символов сопротивления благодаря своей решительности.",
                    givi: "Участвует в тяжелых боях за Дебальцево, командует обороной ключевых позиций. Его подразделение 'Сомали' становится одним из самых боеспособных."
                }
            },
            2016: {
                title: "2016-2017 - Гибель героев",
                description: "Трагические события, унесшие жизни Моторолы и Гиви.",
                heroes: {
                    zaharchenko: "Продолжает руководить республикой в условиях продолжающегося конфликта. Работает над восстановлением инфраструктуры и организацией мирной жизни.",
                    motorola: "16 октября 2016 года Арсен Павлов погибает в результате теракта в подъезде собственного дома. Его гибель становится потрясением для всего Донбасса.",
                    givi: "8 февраля 2017 года Михаил Толстых погибает от смертельного ранения в результате обстрела. Его искренность и простота сделали его народным героем."
                }
            },
            2018: {
                title: "2018 год - Гибель Захарченко",
                description: "Теракт в Донецке и гибель первого главы ДНР.",
                heroes: {
                    zaharchenko: "31 августа 2018 года Александр Захарченко погибает в результате взрыва в центре Донецка. Его смерть становится огромной потерей для республики.",
                    motorola: "К этому времени Моторола уже стал легендой народного сопротивления, его принципы и решительность продолжают вдохновлять бойцов.",
                    givi: "Память о Гиви живет в сердцах людей, его искренность и преданность родной земле остаются примером для многих."
                }
            },
            2022: {
                title: "2022-2025 - Новый этап",
                description: "Эскалация конфликта и продолжение исследований ценностного выбора.",
                heroes: {
                    zaharchenko: "Наследие Александра Захарченко продолжает вдохновлять новых защитников. Его принципы ответственности и верности остаются актуальными.",
                    motorola: "Феномен 'Моторолы' изучается как пример решительности и прямолинейности в критических ситуациях.",
                    givi: "Простота и искренность Гиви становятся символами народного характера сопротивления."
                }
            }
        };

        const data = timelineData[year];
        if (data) {
            const timelineBody = document.getElementById('timelineBody');
            timelineBody.innerHTML = `
                <div class="timeline-detail">
                    <h2>${data.title}</h2>
                    <p>${data.description}</p>
                    
                    <div class="timeline-heroes">
                        <div class="timeline-hero">
                            <h4>🏴 Александр Захарченко</h4>
                            <p>${data.heroes.zaharchenko}</p>
                        </div>
                        <div class="timeline-hero">
                            <h4>🏴 Арсен Павлов "Моторола"</h4>
                            <p>${data.heroes.motorola}</p>
                        </div>
                        <div class="timeline-hero">
                            <h4>🏴 Михаил Толстых "Гиви"</h4>
                            <p>${data.heroes.givi}</p>
                        </div>
                    </div>
                </div>
            `;
            this.openModal('timelineModal');
        }
    }

    // ==================== ГЛАВЫ КНИГИ ====================
    openChapter(chapterNumber) {
        this.currentChapter = chapterNumber;
        
        const chapterContent = `
            <div class="chapter-content">
                <h2>Глава ${chapterNumber}</h2>
                <div class="chapter-placeholder" style="text-align: center; padding: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📖</div>
                    <h3>Скоро здесь появится текст всей главы</h3>
                    <p>Мы активно работаем над наполнением содержания книги. Текст этой главы будет доступен в ближайшее время.</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 2rem;">
                        <div style="text-align: center;">
                            <strong>Полный анализ</strong>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Детальное исследование темы</div>
                        </div>
                        <div style="text-align: center;">
                            <strong>Исторические факты</strong>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Проверенная информация</div>
                        </div>
                        <div style="text-align: center;">
                            <strong>Ценностный подход</strong>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Глубокий анализ мотивации</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modalBody = document.getElementById('modalBody');
        const chapterTitle = document.getElementById('currentChapterTitle');
        
        chapterTitle.textContent = `Глава ${chapterNumber}`;
        modalBody.innerHTML = chapterContent;
        
        this.updateChapterProgress();
        this.updateNavigationButtons();
        this.openModal('chapterModal');
    }

    // ==================== РЕЙТИНГ ====================
    setRating(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
        
        // Сохраняем рейтинг
        this.saveRating(rating);
        this.showNotification(`Спасибо за оценку ${rating} звезд!`, 'success');
    }

    saveRating(rating) {
        let ratings = JSON.parse(localStorage.getItem('bookRatings') || '[]');
        ratings.push({
            rating: rating,
            date: new Date().toISOString(),
            ip: this.getUserIP()
        });
        
        localStorage.setItem('bookRatings', JSON.stringify(ratings));
        this.updateRatingDisplay();
    }

    updateRatingDisplay() {
        const ratings = JSON.parse(localStorage.getItem('bookRatings') || '[]');
        
        if (ratings.length > 0) {
            const total = ratings.reduce((sum, item) => sum + item.rating, 0);
            const average = (total / ratings.length).toFixed(1);
            const count = ratings.length;
            
            document.getElementById('averageRating').textContent = average;
            document.getElementById('ratingCount').textContent = count;
        } else {
            document.getElementById('averageRating').textContent = '0.0';
            document.getElementById('ratingCount').textContent = '0';
        }
    }

    getUserIP() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    // ==================== ТЕСТ ====================
    analyzeTestResults() {
        const answerCounts = [0, 0, 0, 0];
        this.testAnswers.forEach(answer => {
            if (answer !== null) answerCounts[answer]++;
        });
        
        const maxIndex = answerCounts.indexOf(Math.max(...answerCounts));
        
        // Расширенная система результатов
        const results = [
            {
                type: "Человек верности",
                value: "Преданность и долг",
                description: "Вы ставите верность своим принципам, идеалам и близким выше личной выгоды и комфорта. В критической ситуации способны на самопожертвование ради защиты того, что считаете важным.",
                traits: ["Преданность идеалам", "Готовность к самопожертвованию", "Непоколебимость принципов"],
                hero: {
                    name: "Александр Захарченко",
                    similarity: "Способность брать ответственность в критический момент"
                }
            },
            {
                type: "Прагматичный защитник", 
                value: "Рациональность и действие",
                description: "Вы руководствуетесь разумом и практической пользой. Умеете находить оптимальные решения в сложных ситуациях, взвешивая все за и против.",
                traits: ["Рациональное мышление", "Практичность", "Решительность"],
                hero: {
                    name: "Арсен Павлов 'Моторола'",
                    similarity: "Прямолинейность и решительность в действиях"
                }
            },
            {
                type: "Защитник семьи",
                value: "Безопасность и стабильность", 
                description: "Ваш главный приоритет - защита близких, создание безопасной и стабильной среды. Вы надежный и ответственный человек.",
                traits: ["Заботливость", "Надёжность", "Ответственность"],
                hero: null
            },
            {
                type: "Справедливый боец",
                value: "Честность и правда",
                description: "Для вас важнее всего справедливость и честность. Вы не можете мириться с несправедливостью и готовы отстаивать правду.",
                traits: ["Честность", "Принципиальность", "Справедливость"],
                hero: {
                    name: "Михаил Толстых 'Гиви'",
                    similarity: "Простота и искренность в отстаивании правды"
                }
            }
        ];
        
        // Добавляем случайный элемент для разнообразия результатов
        const randomResults = [maxIndex];
        while (randomResults.length < 3) {
            const randomIndex = Math.floor(Math.random() * results.length);
            if (!randomResults.includes(randomIndex)) {
                randomResults.push(randomIndex);
            }
        }
        
        // Выбираем случайный результат из топ-3
        const finalResultIndex = randomResults[Math.floor(Math.random() * randomResults.length)];
        return results[finalResultIndex];
    }

    // ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
    setupEventListeners() {
        this.setupSmoothScroll();
        this.setupSearch();
        this.setupContactForm();
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeAllModals();
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });
    }

    setupHidingHeader() {
        const header = document.getElementById('mainHeader');
        let lastScroll = 0;
        
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
                
                if (currentScroll > lastScroll && currentScroll > 300) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
            } else {
                header.classList.remove('scrolled', 'hidden');
            }
            
            lastScroll = currentScroll;
        };

        const throttledScroll = this.throttle(handleScroll, 100);
        window.addEventListener('scroll', throttledScroll, { passive: true });
    }

    setupScrollProgress() {
        const progressElement = document.getElementById('readingProgress');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressElement && progressFill && progressText) {
            const updateProgress = () => {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.pageYOffset;
                
                const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
                const roundedProgress = Math.round(progress);
                
                progressFill.style.height = `${progress}%`;
                progressText.textContent = `${roundedProgress}%`;
                
                if (scrollTop > 200) {
                    progressElement.classList.add('active');
                } else {
                    progressElement.classList.remove('active');
                }
            };

            const throttledProgress = this.throttle(updateProgress, 100);
            window.addEventListener('scroll', throttledProgress, { passive: true });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
        
        const themeName = this.currentTheme === 'dark' ? 'тёмную' : 'светлую';
        this.showNotification(`Тема изменена на ${themeName}`, 'info');
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        const themeSwitcher = document.querySelector('.theme-switcher-header');
        
        if (themeIcon && themeSwitcher) {
            themeIcon.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
            themeSwitcher.setAttribute('aria-label', 
                this.currentTheme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'
            );
        }
    }

    toggleMenu() {
        const burger = document.querySelector('.burger-menu');
        const nav = document.querySelector('nav');
        
        this.isMenuOpen = !this.isMenuOpen;
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        
        burger.setAttribute('aria-expanded', this.isMenuOpen);
    }

    closeMenu() {
        const burger = document.querySelector('.burger-menu');
        const nav = document.querySelector('nav');
        
        this.isMenuOpen = false;
        burger.classList.remove('active');
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
    }

    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
            });
        });
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            const headerOffset = header.classList.contains('scrolled') ? 80 : 120;
            const targetPosition = element.offsetTop - headerOffset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            this.currentSection = sectionId;
            this.updateActiveNavLink(sectionId);
        }
    }

    updateActiveNavLink(activeId) {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`nav a[href="#${activeId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        
        if (searchInput && searchResults) {
            const debouncedSearch = this.debounce((query) => {
                this.performSearch(query);
            }, 300);

            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                
                if (query.length > 1) {
                    debouncedSearch(query);
                } else {
                    searchResults.style.display = 'none';
                }
            });
            
            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });
        }
    }

    performSearch(query) {
        const searchResults = document.getElementById('searchResults');
        const results = this.searchContent(query);
        
        if (results.length > 0) {
            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="app.selectSearchResult('${result.id}')">
                    <strong>${this.highlightText(result.title, query)}</strong>
                    <p>${this.highlightText(result.preview, query)}</p>
                </div>
            `).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-result-item">Ничего не найдено</div>';
            searchResults.style.display = 'block';
        }
    }

    searchContent(query) {
        const searchData = [
            { id: 'about', title: 'О проекте', preview: 'Исследование ценностного выбора защитников Донбасса' },
            { id: 'heroes', title: 'Герои исследования', preview: 'Моторола, Гиви, Захарченко - анализ их ценностного кода' },
            { id: 'timeline', title: 'Хронология событий', preview: 'Основные даты и события 2014-2025 годов' },
            { id: 'quotes', title: 'Цитаты', preview: 'Ключевые высказывания героев и их анализ' },
            { id: 'book', title: 'Книга', preview: 'Полное исследование феномена верности в формате книги' },
            { id: 'chapters', title: 'Главы книги', preview: 'Содержание и основные разделы исследования' },
            { id: 'test', title: 'Тест', preview: 'Определите ваш ценностный код' },
            { id: 'contact', title: 'Контакты', preview: 'Связь с автором проекта' }
        ];
        
        const lowerQuery = query.toLowerCase();
        return searchData.filter(item => 
            item.title.toLowerCase().includes(lowerQuery) ||
            item.preview.toLowerCase().includes(lowerQuery)
        );
    }

    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    selectSearchResult(sectionId) {
        this.scrollToSection(sectionId);
        document.getElementById('searchResults').style.display = 'none';
        document.getElementById('searchInput').value = '';
    }

    toggleReadingMode() {
        this.isReadingMode = !this.isReadingMode;
        document.body.classList.toggle('reading-mode', this.isReadingMode);
        
        const readingBtn = document.querySelector('.reading-mode-btn');
        if (readingBtn) {
            readingBtn.setAttribute('aria-pressed', this.isReadingMode);
        }
        
        if (this.isReadingMode) {
            document.querySelectorAll('section').forEach(section => {
                section.style.maxWidth = '800px';
                section.style.margin = '2rem auto';
            });
            this.showNotification('Режим чтения включен', 'info');
        } else {
            document.querySelectorAll('section').forEach(section => {
                section.style.maxWidth = '';
                section.style.margin = '';
            });
            this.showNotification('Режим чтения выключен', 'info');
        }
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            const closeBtn = modal.querySelector('.close');
            if (closeBtn) {
                setTimeout(() => closeBtn.focus(), 100);
            }
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }

    showHeroDetail(heroId) {
        const heroes = {
            zaharchenko: {
                name: 'Александр Захарченко',
                years: '1976-2018',
                role: 'Первый глава Донецкой Народной Республики',
                bio: 'Родился 26 июня 1976 года в Донецке. Прошёл путь от шахтёра до руководителя республики. Работал на шахте имени Засядько, участвовал в обороне Донецка с первых дней конфликта. Был избран главой ДНР в 2014 году. Погиб 31 августа 2018 года в результате теракта.',
                quotes: [
                    "Мы сделали свой выбор. И назад дороги нет.",
                    "Мы защищаем свою землю, свои семьи, свою правду.",
                    "Наша сила - в правде и в единстве.",
                    "Я обычный человек, который взял на себя ответственность."
                ],
                facts: [
                    "Работал на шахте имени Засядько",
                    "Участвовал в обороне Донецка с первых дней",
                    "Был избран главой ДНР в 2014 году",
                    "Погиб в результате теракта в 2018 году"
                ],
                values: ["Ответственность", "Верность", "Стойкость", "Патриотизм"]
            },
            motorola: {
                name: 'Арсен Павлов "Моторола"',
                years: '1983-2016', 
                role: 'Командир подразделения "Спарта"',
                bio: 'Родился 2 февраля 1983 года в Ухте. Проходил службу в морской пехоте. Один из самых известных командиров народного ополчения, прославился участием в боях за донецкий аэропорт. Стал символом сопротивления и воли к победе. Погиб 16 октября 2016 года.',
                quotes: [
                    "На войне нет времени на сомнения. Решил — делай.",
                    "Мы воюем за правду, а правда всегда побеждает.",
                    "Я обычный парень, который защищает свой дом.",
                    "Не важно, сколько врагов - важно, на чьей стороне правда."
                ],
                facts: [
                    "Проходил службу в морской пехоте",
                    "Участвовал в штурме донецкого аэропорта", 
                    "Командовал подразделением «Спарта»",
                    "Стал одним из самых известных командиров ополчения"
                ],
                values: ["Решительность", "Смелость", "Прямота", "Преданность"]
            },
            givi: {
                name: 'Михаил Толстых "Гиви"',
                years: '1980-2017',
                role: 'Командир подразделения "Сомали"', 
                bio: 'Родился 19 июля 1980 года в Иловайске. Работал водителем с 2011 по 2014 год. В начале конфликта взял в руки оружие для защиты родного города. Прославился своими искренними видеообращениями и участием в ключевых сражениях. Командовал обороной Иловайска. Погиб 8 февраля 2017 года.',
                quotes: [
                    "Мы не наёмники. Мы защищаем свои дома.",
                    "У нас нет другого выбора, кроме как победить.",
                    "Наша сила в том, что мы защищаем правду.",
                    "Я простой человек, который любит свою землю."
                ],
                facts: [
                    "Работал водителем с 2011 по 2014 год",
                    "Командовал обороной Иловайска",
                    "Возглавил подразделение «Сомали»", 
                    "Стал символом стойкости простых людей",
                    "Прославился видеообращениями с фронта"
                ],
                values: ["Простота", "Честность", "Народность", "Верность долгу"]
            }
        };
        
        const hero = heroes[heroId];
        if (hero) {
            const modalBody = document.getElementById('heroBody');
            modalBody.innerHTML = `
                <div class="hero-detail">
                    <div class="hero-header">
                        <h2>${hero.name}</h2>
                        <div class="hero-years">${hero.years}</div>
                        <div class="hero-role">${hero.role}</div>
                    </div>
                    
                    <div class="hero-bio">
                        <h3>Биография</h3>
                        <p>${hero.bio}</p>
                    </div>
                    
                    <div class="hero-values">
                        <h3>Ключевые ценности</h3>
                        <div class="values-grid">
                            ${hero.values.map(value => `
                                <span class="value-tag">${value}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="hero-quotes">
                        <h3>Ключевые цитаты</h3>
                        ${hero.quotes.map(quote => `
                            <blockquote>
                                <p>${quote}</p>
                            </blockquote>
                        `).join('')}
                    </div>
                    
                    <div class="hero-facts">
                        <h3>Факты</h3>
                        <ul>
                            ${hero.facts.map(fact => `<li>${fact}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            this.openModal('heroModal');
        }
    }

    shareQuote(index) {
        const quotes = [
            "Мы сделали свой выбор. И назад дороги нет. - Александр Захарченко",
            "На войне нет времени на сомнения. Решил — делай. - Арсен Павлов («Моторола»)",
            "Мы не наёмники. Мы защищаем свои дома. У нас нет другого выбора. - Михаил Толстых («Гиви»)"
        ];
        
        const quote = quotes[index];
        
        if (navigator.share) {
            navigator.share({
                title: 'Цитата с сайта "Феномен верности"',
                text: quote,
                url: window.location.href
            }).catch(() => {
                this.copyToClipboard(quote);
            });
        } else {
            this.copyToClipboard(quote);
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Цитата скопирована в буфер обмена!', 'success');
        }).catch(() => {
            this.showNotification('Не удалось скопировать цитату', 'error');
        });
    }

    addToFavorites(index) {
        let favorites = JSON.parse(localStorage.getItem('quoteFavorites') || '[]');
        if (!favorites.includes(index)) {
            favorites.push(index);
            localStorage.setItem('quoteFavorites', JSON.stringify(favorites));
            this.showNotification('Цитата добавлена в избранное!', 'success');
        } else {
            this.showNotification('Цитата уже в избранном!', 'info');
        }
    }

    prevChapter() {
        if (this.currentChapter > 1) {
            this.currentChapter--;
            this.openChapter(this.currentChapter);
        }
    }

    nextChapter() {
        if (this.currentChapter < this.totalChapters) {
            this.currentChapter++;
            this.openChapter(this.currentChapter);
        }
    }

    updateChapterProgress() {
        const progress = (this.currentChapter / this.totalChapters) * 100;
        const progressFill = document.getElementById('chapterProgressFill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.querySelector('.nav-button:first-child');
        const nextBtn = document.querySelector('.nav-button:last-child');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentChapter === 1;
            prevBtn.textContent = this.currentChapter === 1 ? '← Начало' : '← Предыдущая';
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentChapter === this.totalChapters;
            nextBtn.textContent = this.currentChapter === this.totalChapters ? 'Конец →' : 'Следующая →';
        }
    }

    startTest() {
        document.getElementById('testStart').style.display = 'none';
        document.getElementById('testQuestions').style.display = 'block';
        this.loadTestQuestions();
    }

    loadTestQuestions() {
        const questions = [
            {
                question: "Что для вас важнее в сложной ситуации?",
                answers: [
                    "Верность своим принципам, даже если это приведёт к личным потерям",
                    "Практическая польза и достижение наилучшего результата", 
                    "Безопасность и благополучие близких людей",
                    "Справедливость и честность, независимо от последствий"
                ]
            },
            {
                question: "Как бы вы поступили, если бы пришлось защищать свой дом от реальной угрозы?",
                answers: [
                    "Взял бы в руки оружие без раздумий, чтобы защитить родных и землю",
                    "Попытался бы найти мирное решение и договориться",
                    "Уехал бы в безопасное место с семьёй",
                    "Организовал бы коллективное сопротивление с соседями"
                ]
            },
            {
                question: "Что значит для вас понятие 'долг'?",
                answers: [
                    "Ответственность перед своими близкими, народом и Родиной",
                    "Выполнение взятых на себя обязательств и обещаний",
                    "Следование закону, правилам и общественным нормам",
                    "Внутреннее чувство правильного, голос совести"
                ]
            }
        ];
        
        const container = document.getElementById('testQuestions');
        container.innerHTML = questions.map((q, index) => `
            <div class="question" id="question-${index}">
                <h3>Вопрос ${index + 1} из ${questions.length}</h3>
                <p>${q.question}</p>
                <div class="answers">
                    ${q.answers.map((answer, ansIndex) => `
                        <div class="answer" onclick="app.selectAnswer(${index}, ${ansIndex})">
                            ${answer}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('') + `
            <div class="test-actions">
                <button onclick="app.finishTest()" class="button primary" id="finishTestBtn" disabled>
                    Завершить тест
                </button>
            </div>
        `;
        
        this.testAnswers = new Array(questions.length).fill(null);
    }

    selectAnswer(questionIndex, answerIndex) {
        const answers = document.querySelectorAll(`#question-${questionIndex} .answer`);
        answers.forEach((answer, index) => {
            answer.classList.toggle('selected', index === answerIndex);
        });
        
        this.testAnswers[questionIndex] = answerIndex;
        
        const allAnswered = this.testAnswers.every(answer => answer !== null);
        const finishBtn = document.getElementById('finishTestBtn');
        if (finishBtn) {
            finishBtn.disabled = !allAnswered;
        }
    }

    finishTest() {
        const answered = this.testAnswers.filter(a => a !== null).length;
        const totalQuestions = this.testAnswers.length;
        
        if (answered < totalQuestions) {
            this.showNotification(`Ответьте на все вопросы! Осталось ${totalQuestions - answered}`, 'error');
            return;
        }
        
        document.getElementById('testQuestions').style.display = 'none';
        document.getElementById('testResult').style.display = 'block';
        
        const result = this.analyzeTestResults();
        
        document.getElementById('testResult').innerHTML = `
            <div class="result-header">
                <h3>Ваш ценностный код</h3>
                <div class="result-score">
                    Вы ответили на ${answered} из ${totalQuestions} вопросов
                </div>
            </div>
            
            <div class="result-content">
                <div class="result-type">
                    <h4>Тип личности:</h4>
                    <div class="type-badge">${result.type}</div>
                </div>
                
                <div class="result-value">
                    <h4>Основная ценность:</h4>
                    <p>${result.value}</p>
                </div>
                
                <div class="result-description">
                    <h4>Описание:</h4>
                    <p>${result.description}</p>
                </div>
                
                <div class="result-traits">
                    <h4>Характерные черты:</h4>
                    <ul>
                        ${result.traits.map(trait => `<li>${trait}</li>`).join('')}
                    </ul>
                </div>
                
                ${result.hero ? `
                <div class="result-hero">
                    <h4>Ближайший исторический аналог:</h4>
                    <div class="hero-match">
                        <strong>${result.hero.name}</strong> - ${result.hero.similarity}
                    </div>
                </div>
                ` : '<p><em>У вас уникальный ценностный профиль!</em></p>'}
            </div>
            
            <div class="result-actions">
                <button onclick="app.restartTest()" class="button primary">Пройти тест ещё раз</button>
                <button onclick="app.shareTestResult()" class="button secondary">Поделиться результатом</button>
            </div>
        `;
        
        this.saveTestResult(result);
    }

    saveTestResult(result) {
        const testHistory = JSON.parse(localStorage.getItem('testHistory') || '[]');
        testHistory.push({
            date: new Date().toISOString(),
            result: result
        });
        localStorage.setItem('testHistory', JSON.stringify(testHistory));
    }

    shareTestResult() {
        const resultElement = document.querySelector('.result-type .type-badge');
        if (resultElement) {
            const resultText = `Мой ценностный код: ${resultElement.textContent}. Узнай свой на сайте "Феномен верности"`;
            this.shareText(resultText);
        }
    }

    shareText(text) {
        if (navigator.share) {
            navigator.share({
                text: text,
                url: window.location.href
            });
        } else {
            this.copyToClipboard(text);
        }
    }

    restartTest() {
        document.getElementById('testResult').style.display = 'none';
        document.getElementById('testStart').style.display = 'block';
        this.testAnswers = [];
    }

    setupContactForm() {
        const form = document.getElementById('feedbackForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });

            form.addEventListener('input', (e) => {
                this.validateField(e.target);
            });
        }
    }

    validateField(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        
        if (field.value.trim() === '') {
            this.showFieldError(field, 'Это поле обязательно для заполнения');
            return false;
        }
        
        if (field.type === 'email' && !this.isValidEmail(field.value)) {
            this.showFieldError(field, 'Введите корректный email адрес');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        field.classList.add('error');
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            message: formData.get('message').trim()
        };
        
        let isValid = true;
        ['name', 'email', 'message'].forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showNotification('Исправьте ошибки в форме', 'error');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            this.showNotification('Сообщение отправлено! Спасибо за обратную связь.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            this.saveContactMessage(data);
        }, 1500);
    }

    saveContactMessage(data) {
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push({
            ...data,
            date: new Date().toISOString(),
            id: Date.now()
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, type === 'error' ? 5000 : 3000);
        }
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    exportToPDF() {
        this.showNotification('Функция экспорта в PDF будет доступна в ближайшее время!', 'info');
    }

    startAudioBook() {
        this.showNotification('Аудиоверсия книги готовится к выпуску! Следите за обновлениями.', 'info');
    }

    showPrivacyPolicy() {
        this.showNotification('Политика конфиденциальности будет размещена в этом разделе.', 'info');
    }

    exportUserData() {
        const userData = {
            theme: this.currentTheme,
            favorites: JSON.parse(localStorage.getItem('quoteFavorites') || '[]'),
            ratings: JSON.parse(localStorage.getItem('bookRatings') || '[]'),
            testHistory: JSON.parse(localStorage.getItem('testHistory') || '[]'),
            contactMessages: JSON.parse(localStorage.getItem('contactMessages') || '[]'),
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'fenomen-vernosti-user-data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Данные успешно экспортированы!', 'success');
    }

    clearProgress() {
        if (confirm('Вы уверены, что хотите очистить весь прогресс? Это действие нельзя отменить.')) {
            localStorage.removeItem('quoteFavorites');
            localStorage.removeItem('bookRatings');
            localStorage.removeItem('testHistory');
            localStorage.removeItem('contactMessages');
            
            const stars = document.querySelectorAll('.star');
            stars.forEach(star => {
                star.classList.remove('active');
            });
            
            this.updateRatingDisplay();
            
            this.showNotification('Весь прогресс успешно очищен!', 'success');
        }
    }

    restoreUserPreferences() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            document.body.setAttribute('data-theme', this.currentTheme);
            this.updateThemeIcon();
        }
        
        this.updateRatingDisplay();
    }
}

// Создаем глобальный экземпляр приложения
const app = new FenomenVernostiApp();

// Делаем доступным глобально для HTML атрибутов
window.app = app;

// Инициализация при полной загрузке страницы
window.addEventListener('load', () => {
    console.log('Страница полностью загружена!');
    document.body.classList.add('loaded');
});
