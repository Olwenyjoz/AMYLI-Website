"use strict";

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializeTheme();
    initializeLanguage();
    initializeTeam();
    initializeProgramModals();
    initializeContactForm();
    initializeBackToTop();
    initializeFooterYear();
});

/* ==========================================================================
   NAVIGATION
   ========================================================================== */
function initializeNavigation() {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const dropdowns = document.querySelectorAll(".nav-dropdown");

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener("click", () => {
        const open = mainNav.classList.toggle("open");
        menuToggle.classList.toggle("active", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });

    dropdowns.forEach((dropdown) => {
        const trigger = dropdown.querySelector(".nav-drop-trigger");
        if (!trigger) return;
        
        trigger.addEventListener("click", (event) => {
            event.stopPropagation();
            const shouldOpen = !dropdown.classList.contains("open");
            closeDropdowns();
            if (shouldOpen) {
                dropdown.classList.add("open");
                trigger.setAttribute("aria-expanded", "true");
            }
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".nav-dropdown")) {
            closeDropdowns();
        }
        if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            closeMobileMenu();
            closeDropdowns();
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeDropdowns();
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMobileMenu();
            closeDropdowns();
        }
    });

    function closeMobileMenu() {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }

    function closeDropdowns() {
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("open");
            const trigger = dropdown.querySelector(".nav-drop-trigger");
            if (trigger) {
                trigger.setAttribute("aria-expanded", "false");
            }
        });
    }
}

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initializeTheme() {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    let savedTheme = "light";
    try {
        savedTheme = localStorage.getItem("amyli-theme") || "light";
    } catch (error) { /* Storage may be unavailable */ }

    applyTheme(savedTheme);

    toggle.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-mode");
        applyTheme(isDark ? "light" : "dark");
    });

    function applyTheme(theme) {
        const isDark = theme === "dark";
        document.body.classList.toggle("dark-mode", isDark);
        toggle.textContent = isDark ? "☀" : "☾";
        toggle.setAttribute("aria-pressed", String(isDark));
        toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        
        try { 
            localStorage.setItem("amyli-theme", theme); 
        } catch (error) { /* Theme remains active */ }
    }
}

/* ==========================================================================
   LANGUAGE SELECTOR
   ========================================================================== */
const translations = {
    en: {
        announcement_text: "Empower. Adapt. Lead. Succeed.",
        announcement_link: "Be part of the journey ↗",
        brand_subtitle: "Academic Mentorship & Youth Leadership Initiative",
        nav_home: "Home",
        nav_about: "About",
        nav_about_who: "Who we are",
        nav_about_mission: "Mission and vision",
        nav_about_values: "Our core values",
        nav_about_journey: "Our development journey",
        nav_about_team: "Our team",
        nav_programmes: "Programmes",
        nav_prog_education: "Academic mentorship",
        nav_prog_adaptation: "Student adaptation",
        nav_prog_wellbeing: "Health and personal development",
        nav_prog_research: "Research development",
        nav_prog_leadership: "Leadership and careers",
        nav_prog_workshops: "Workshops and events",
        nav_prog_community: "Community engagement",
        nav_explore: "Explore",
        nav_exp_stories: "Learning resources",
        nav_exp_platform: "Digital platform",
        nav_exp_impact: "Our SDG contribution",
        nav_exp_partners: "Partnerships",
        nav_exp_events: "Events and activities",
        nav_get_involved: "Get involved",
        nav_contact: "Contact",
        hero_eyebrow: "Academic mentorship and youth leadership",
        hero_title: "Empower minds.<br><em>Shape futures.</em>",
        hero_desc: "Building a generation of knowledgeable, confident and socially responsible young leaders.",
        hero_btn_discover: "Discover AMYLI ↗",
        hero_btn_programmes: "Explore our programmes",
        hero_label: "Learning. Leadership. Opportunity.",
        about_logo_text: "Empower. Adapt. Lead. Succeed.",
        about_kicker: "WHO WE ARE",
        about_title: "Building knowledgeable, confident and <em>responsible leaders.</em>",
        about_p1: "AMYLI (Academic Mentorship & Youth Leadership Initiative) is a youth-focused, non-profit and non-political initiative dedicated to empowering students, young professionals, aspiring researchers, and emerging leaders through academic mentorship, education, personal development, research support, leadership training, and community engagement.",
        about_p2: "We believe that every young person deserves access to guidance, opportunities, knowledge, and supportive networks that enable them to realise their potential. Through mentorship, educational programmes, webinars, workshops, research activities, and collaborative partnerships, AMYLI helps young people navigate academic life, develop practical skills, build meaningful connections, and prepare for successful professional and personal futures.",
        about_link: "Discover our mission ↗",
        mission_kicker: "OUR MISSION",
        mission_title: "Empowering people through learning.",
        mission_desc: "To empower students and young professionals through accessible academic mentorship, education, research development, leadership training, and community engagement, enabling them to reach their full potential and contribute meaningfully to society.",
        vision_kicker: "OUR VISION",
        vision_title: "A generation ready to lead.",
        vision_desc: "To build a generation of academically strong, socially responsible, internationally minded, and confident young professionals capable of contributing positively to their communities and countries.",
        values_kicker: "WHAT GUIDES US",
        values_title: "Our core <em>values.</em>",
        values_desc: "Our values shape how we learn, work together, serve communities and support the next generation.",
        value_1_title: "Academic excellence",
        value_1_desc: "Encouraging lifelong learning, intellectual curiosity, critical thinking, and the pursuit of knowledge.",
        value_2_title: "Mentorship and mutual support",
        value_2_desc: "Connecting individuals through meaningful relationships that promote guidance, encouragement, knowledge-sharing, and personal growth.",
        value_3_title: "Youth empowerment",
        value_3_desc: "Equipping young people with the confidence, skills, and opportunities to take initiative and become active contributors to society.",
        value_4_title: "Inclusion and equal opportunity",
        value_4_desc: "Promoting a welcoming environment where young people from different educational, cultural, linguistic, and socioeconomic backgrounds can participate and develop.",
        value_5_title: "Leadership and responsibility",
        value_5_desc: "Encouraging ethical decision-making, accountability, initiative, and service-oriented leadership.",
        value_6_title: "Research and innovation",
        value_6_desc: "Supporting scientific curiosity, evidence-based thinking, research skills, and the development of innovative solutions to social challenges.",
        value_7_title: "Volunteerism and community service",
        value_7_desc: "Inspiring young people to use their time, knowledge, and skills to support others and improve their communities.",
        value_8_title: "Integrity and respect",
        value_8_desc: "Upholding professional ethics, respect, and intercultural understanding.",
        value_9_title: "Partnership and international cooperation",
        value_9_desc: "Building constructive relationships among universities, educational institutions, professional communities, civil society, and youth organisations.",
        programs_kicker: "OUR PROGRAMMES",
        programs_title: "Turning potential into <em>progress.</em>",
        programs_desc: "We connect young people with knowledge, guidance, skills and supportive networks to encourage academic, professional and personal development.",
        prog_1_title: "Academic mentorship",
        prog_1_summary: "Connecting students with experienced mentors for academic guidance.",
        prog_1_desc: "AMYLI connects students and young professionals with experienced mentors, researchers, educators, and other suitably qualified individuals who can provide guidance based on participants' interests, goals, and development needs.",
        prog_2_title: "Student adaptation",
        prog_2_summary: "Helping students navigate university life and new environments.",
        prog_2_desc: "Beginning university or studying in a new country can be a significant transition. AMYLI helps students better understand academic expectations, navigate university life, build social connections, and develop the confidence to participate actively in their educational communities.",
        prog_3_title: "Health & wellbeing",
        prog_3_summary: "Promoting mental well-being, stress management, and healthy habits.",
        prog_3_desc: "We recognise that academic success and personal growth are closely connected to physical health, mental well-being, emotional resilience, and healthy daily habits. AMYLI promotes awareness of stress management, burnout prevention, time management, healthy lifestyles, self-confidence, and work-life balance.",
        prog_4_title: "Research development",
        prog_4_summary: "Strengthening academic writing, methodology, and scientific skills.",
        prog_4_desc: "AMYLI encourages young people to develop their research interests, strengthen academic writing skills, and participate in scientific and intellectual activities.",
        prog_5_title: "Leadership & careers",
        prog_5_summary: "Developing practical leadership and professional skills for future careers.",
        prog_5_desc: "AMYLI supports the development of practical leadership and professional skills that help young people transition from education into meaningful careers and community leadership.",
        prog_6_title: "Workshops & events",
        prog_6_summary: "Bringing together students, mentors, and professionals to exchange knowledge.",
        prog_6_desc: "AMYLI organises educational activities designed to bring together students, mentors, academics, researchers, professionals, volunteers, and youth leaders.",
        prog_7_title: "Community engagement",
        prog_7_summary: "Encouraging volunteering and collaborative projects that respond to real needs.",
        prog_7_desc: "We believe that meaningful development includes a commitment to serving others. AMYLI encourages young people to participate in volunteering, peer support, educational outreach, community projects, and collaborative activities that respond to real needs.",
        journey_kicker: "THE AMYLI DEVELOPMENT JOURNEY",
        journey_title: "From learning to <em>leadership.</em>",
        journey_desc: "Our approach to youth development is guided by six interconnected stages.",
        journey_1_title: "Adapt",
        journey_1_desc: "Understand new environments, navigate challenges, and develop the confidence to participate in academic and social communities.",
        journey_2_title: "Learn",
        journey_2_desc: "Acquire knowledge, strengthen academic skills, and embrace continuous personal and professional development.",
        journey_3_title: "Connect",
        journey_3_desc: "Build meaningful relationships with mentors, peers, educators, researchers, and professional networks.",
        journey_4_title: "Lead",
        journey_4_desc: "Develop initiative, communication, teamwork, decision-making, and responsible leadership.",
        journey_5_title: "Serve",
        journey_5_desc: "Apply knowledge and skills through volunteering, community engagement, and activities that benefit others.",
        journey_6_title: "Mentor",
        journey_6_desc: "Share experience, support others, and contribute to a sustainable culture of guidance, learning, and mutual growth.",
        sdg_kicker: "OUR AREAS OF CONTRIBUTION",
        sdg_title: "Learning today.<br><em>Contributing tomorrow.</em>",
        sdg_desc: "AMYLI's activities align with several United Nations Sustainable Development Goals (SDGs).",
        sdg_4_title: "Quality education",
        sdg_4_desc: "Supporting inclusive learning, academic development, mentorship, and lifelong learning opportunities.",
        sdg_8_title: "Decent work and economic growth",
        sdg_8_desc: "Strengthening employability, career readiness, professional skills, and youth leadership.",
        sdg_10_title: "Reduced inequalities",
        sdg_10_desc: "Promoting inclusive access to mentorship, educational resources, and personal development opportunities.",
        sdg_16_title: "Peace, justice and strong institutions",
        sdg_16_desc: "Encouraging responsible leadership, accountability, ethical conduct, and constructive civic participation.",
        sdg_17_title: "Partnerships for the goals",
        sdg_17_desc: "Developing cooperation among educational institutions, civil society, professional communities, and youth organisations.",
        sdg_3_title: "Good health and well-being",
        sdg_3_desc: "Promoting health awareness, mental well-being, stress management, and healthy lifestyles.",
        team_kicker: "THE PEOPLE BEHIND THE MISSION",
        team_title: "People make the <em>mission.</em>",
        team_desc: "Meet the people who help advance AMYLI's work.",
        team_note: "Only verified team information should be published.",
        team_cta: "View profile ↗",
        contact_kicker: "GET IN TOUCH",
        contact_title: "Let's start a<br><em>conversation.</em>",
        contact_desc: "Have a question about mentorship, research, volunteering, educational activities or a potential partnership? Contact AMYLI.",
        contact_email_title: "Email us",
        contact_phone_title: "Call us",
        contact_focus_title: "Our focus",
        contact_focus_desc: "Academic mentorship, education, research, leadership and community engagement.",
        contact_social_title: "Follow AMYLI",
        form_title: "Send us a message",
        form_desc: "Complete the form to prepare an email in your email application.",
        form_name: "Your name",
        form_email: "Your email",
        form_topic: "Subject",
        form_message: "Message",
        form_submit: "Prepare email ↗",
        form_status: "This form opens your email application. It does not store messages.",
        footer_desc: "Educate. Connect. Grow. Empowering young people to turn their potential into meaningful progress.",
        footer_explore: "Explore",
        footer_about: "About AMYLI",
        footer_programmes: "Our programmes",
        footer_get_involved: "Get involved",
        footer_rights: "All rights reserved.",
        footer_back_top: "Back to top ↑"
    },
    ru: {
        announcement_text: "Расширяем возможности. Адаптируемся. Ведем. Добиваемся успеха.",
        announcement_link: "Станьте частью пути ↗",
        brand_subtitle: "Инициатива по академическому наставничеству и молодежному лидерству",
        nav_home: "Главная",
        nav_about: "О нас",
        nav_about_who: "Кто мы",
        nav_about_mission: "Миссия и видение",
        nav_about_values: "Наши ценности",
        nav_about_journey: "Наш путь развития",
        nav_about_team: "Наша команда",
        nav_programmes: "Программы",
        nav_prog_education: "Академическое наставничество",
        nav_prog_adaptation: "Адаптация студентов",
        nav_prog_wellbeing: "Здоровье и личностное развитие",
        nav_prog_research: "Развитие исследований",
        nav_prog_leadership: "Лидерство и карьера",
        nav_prog_workshops: "Семинары и мероприятия",
        nav_prog_community: "Вовлечение сообщества",
        nav_explore: "Исследовать",
        nav_exp_stories: "Учебные ресурсы",
        nav_exp_platform: "Цифровая платформа",
        nav_exp_impact: "Наш вклад в ЦУР",
        nav_exp_partners: "Партнерства",
        nav_exp_events: "События и мероприятия",
        nav_get_involved: "Принять участие",
        nav_contact: "Контакты",
        hero_eyebrow: "Академическое наставничество и молодежное лидерство",
        hero_title: "Расширяем возможности.<br><em>Формируем будущее.</em>",
        hero_desc: "Воспитываем поколение знающих, уверенных и социально ответственных молодых лидеров.",
        hero_btn_discover: "Узнать об AMYLI ↗",
        hero_btn_programmes: "Наши программы",
        hero_label: "Обучение. Лидерство. Возможности.",
        about_logo_text: "Расширяем возможности. Адаптируемся. Ведем. Добиваемся успеха.",
        about_kicker: "КТО МЫ",
        about_title: "Воспитываем знающих, уверенных и <em>ответственных лидеров.</em>",
        about_p1: "AMYLI (Инициатива по академическому наставничеству и молодежному лидерству) — это молодежная, некоммерческая и неполитическая инициатива, направленная на расширение возможностей студентов, молодых специалистов, начинающих исследователей и будущих лидеров через академическое наставничество, образование, личностное развитие, поддержку исследований, обучение лидерству и вовлечение сообщества.",
        about_p2: "Мы верим, что каждый молодой человек заслуживает доступа к руководству, возможностям, знаниям и поддерживающим сетям, которые позволяют им реализовать свой потенциал. Через наставничество, образовательные программы, вебинары, семинары, исследования и партнерства AMYLI помогает молодым людям ориентироваться в академической жизни, развивать практические навыки, строить значимые связи и готовиться к успешному профессиональному и личному будущему.",
        about_link: "Узнать о нашей миссии ↗",
        mission_kicker: "НАША МИССИЯ",
        mission_title: "Расширяем возможности через обучение.",
        mission_desc: "Расширять возможности студентов и молодых специалистов через доступное академическое наставничество, образование, развитие исследований, обучение лидерству и вовлечение сообщества, позволяя им полностью раскрыть свой потенциал и вносить значимый вклад в общество.",
        vision_kicker: "НАШЕ ВИДЕНИЕ",
        vision_title: "Поколение, готовое вести за собой.",
        vision_desc: "Создать поколение академически сильных, социально ответственных, мыслящих международно и уверенных молодых специалистов, способных позитивно влиять на свои сообщества и страны.",
        values_kicker: "ЧТО НАМИ РУКОВОДИТ",
        values_title: "Наши основные <em>ценности.</em>",
        values_desc: "Наши ценности определяют, как мы учимся, работаем вместе, служим сообществам и поддерживаем следующее поколение.",
        value_1_title: "Академическое превосходство",
        value_1_desc: "Поощрение обучения на протяжении всей жизни, интеллектуального любопытства, критического мышления и стремления к знаниям.",
        value_2_title: "Наставничество и взаимная поддержка",
        value_2_desc: "Связывание людей через значимые отношения, способствующие руководству, поощрению, обмену знаниями и личностному росту.",
        value_3_title: "Расширение прав и возможностей молодежи",
        value_3_desc: "Оснащение молодых людей уверенностью, навыками и возможностями для проявления инициативы и становления активными членами общества.",
        value_4_title: "Инклюзивность и равные возможности",
        value_4_desc: "Создание благоприятной среды, в которой молодые люди из разных образовательных, культурных, языковых и социально-экономических слоев могут участвовать и развиваться.",
        value_5_title: "Лидерство и ответственность",
        value_5_desc: "Поощрение этичного принятия решений, подотчетности, инициативы и лидерства, ориентированного на служение.",
        value_6_title: "Исследования и инновации",
        value_6_desc: "Поддержка научного любопытства, мышления, основанного на доказательствах, исследовательских навыков и разработки инновационных решений социальных проблем.",
        value_7_title: "Волонтерство и общественная работа",
        value_7_desc: "Вдохновлять молодых людей использовать свое время, знания и навыки для поддержки других и улучшения своих сообществ.",
        value_8_title: "Честность и уважение",
        value_8_desc: "Соблюдение профессиональной этики, уважения и межкультурного взаимопонимания.",
        value_9_title: "Партнерство и международное сотрудничество",
        value_9_desc: "Построение конструктивных отношений между университетами, образовательными учреждениями, профессиональными сообществами, гражданским обществом и молодежными организациями.",
        programs_kicker: "НАШИ ПРОГРАММЫ",
        programs_title: "Превращаем потенциал в <em>прогресс.</em>",
        programs_desc: "Мы связываем молодых людей со знаниями, руководством, навыками и поддерживающими сетями для поощрения академического, профессионального и личного развития.",
        prog_1_title: "Академическое наставничество",
        prog_1_summary: "Связываем студентов с опытными наставниками для академического руководства.",
        prog_1_desc: "AMYLI связывает студентов и молодых специалистов с опытными наставниками, исследователями, преподавателями и другими квалифицированными специалистами, которые могут предоставить руководство, основанное на интересах, целях и потребностях участников в развитии.",
        prog_2_title: "Адаптация студентов",
        prog_2_summary: "Помогаем студентам ориентироваться в университетской жизни и новой среде.",
        prog_2_desc: "Начало учебы в университете или за рубежом может быть значительным переходом. AMYLI помогает студентам лучше понять академические ожидания, ориентироваться в университетской жизни, строить социальные связи и развивать уверенность для активного участия в своих образовательных сообществах.",
        prog_3_title: "Здоровье и благополучие",
        prog_3_summary: "Продвигаем психическое благополучие, управление стрессом и здоровые привычки.",
        prog_3_desc: "Мы признаем, что академический успех и личностный рост тесно связаны с физическим здоровьем, психическим благополучием, эмоциональной устойчивостью и здоровыми ежедневными привычками. AMYLI повышает осведомленность о управлении стрессом, предотвращении выгорания, тайм-менеджменте, здоровом образе жизни, уверенности в себе и балансе между работой и жизнью.",
        prog_4_title: "Развитие исследований",
        prog_4_summary: "Укрепляем академическое письмо, методологию и научные навыки.",
        prog_4_desc: "AMYLI поощряет молодых людей развивать свои исследовательские интересы, укреплять навыки академического письма и участвовать в научной и интеллектуальной деятельности.",
        prog_5_title: "Лидерство и карьера",
        prog_5_summary: "Развиваем практические лидерские и профессиональные навыки для будущей карьеры.",
        prog_5_desc: "AMYLI поддерживает развитие практических лидерских и профессиональных навыков, которые помогают молодым людям перейти от образования к значимой карьере и лидерству в сообществе.",
        prog_6_title: "Семинары и мероприятия",
        prog_6_summary: "Объединяем студентов, наставников и специалистов для обмена знаниями.",
        prog_6_desc: "AMYLI организует образовательные мероприятия, предназначенные для объединения студентов, наставников, академиков, исследователей, специалистов, волонтеров и молодежных лидеров.",
        prog_7_title: "Вовлечение сообщества",
        prog_7_summary: "Поощряем волонтерство и совместные проекты, отвечающие реальным потребностям.",
        prog_7_desc: "Мы верим, что значимое развитие включает в себя приверженность служению другим. AMYLI поощряет молодых людей участвовать в волонтерстве, взаимной поддержке, образовательной работе, общественных проектах и совместных мероприятиях, отвечающих реальным потребностям.",
        journey_kicker: "ПУТЬ РАЗВИТИЯ AMYLI",
        journey_title: "От обучения к <em>лидерству.</em>",
        journey_desc: "Наш подход к развитию молодежи руководствуется шестью взаимосвязанными этапами.",
        journey_1_title: "Адаптация",
        journey_1_desc: "Понимание новой среды, преодоление трудностей и развитие уверенности для участия в академических и социальных сообществах.",
        journey_2_title: "Обучение",
        journey_2_desc: "Приобретение знаний, укрепление академических навыков и непрерывное личностное и профессиональное развитие.",
        journey_3_title: "Связи",
        journey_3_desc: "Построение значимых отношений с наставниками, сверстниками, преподавателями, исследователями и профессиональными сетями.",
        journey_4_title: "Лидерство",
        journey_4_desc: "Развитие инициативы, коммуникации, командной работы, принятия решений и ответственного лидерства.",
        journey_5_title: "Служение",
        journey_5_desc: "Применение знаний и навыков через волонтерство, вовлечение сообщества и деятельность, приносящую пользу другим.",
        journey_6_title: "Наставничество",
        journey_6_desc: "Обмен опытом, поддержка других и вклад в устойчивую культуру руководства, обучения и взаимного роста.",
        sdg_kicker: "НАШИ НАПРАВЛЕНИЯ ВКЛАДА",
        sdg_title: "Учимся сегодня.<br><em>Вносим вклад завтра.</em>",
        sdg_desc: "Деятельность AMYLI соответствует нескольким Целям устойчивого развития ООН (ЦУР).",
        sdg_4_title: "Качественное образование",
        sdg_4_desc: "Поддержка инклюзивного обучения, академического развития, наставничества и возможностей для обучения на протяжении всей жизни.",
        sdg_8_title: "Достойная работа и экономический рост",
        sdg_8_desc: "Укрепление трудоустройства, готовности к карьере, профессиональных навыков и молодежного лидерства.",
        sdg_10_title: "Уменьшение неравенства",
        sdg_10_desc: "Продвижение инклюзивного доступа к наставничеству, образовательным ресурсам и возможностям личностного развития.",
        sdg_16_title: "Мир, справедливость и сильные институты",
        sdg_16_desc: "Поощрение ответственного лидерства, подотчетности, этичного поведения и конструктивного гражданского участия.",
        sdg_17_title: "Партнерство в интересах устойчивого развития",
        sdg_17_desc: "Развитие сотрудничества между образовательными учреждениями, гражданским обществом, профессиональными сообществами и молодежными организациями.",
        sdg_3_title: "Хорошее здоровье и благополучие",
        sdg_3_desc: "Повышение осведомленности о здоровье, психическом благополучии, управлении стрессом и здоровом образе жизни.",
        team_kicker: "ЛЮДИ, СТОЯЩИЕ ЗА МИССИЕЙ",
        team_title: "Люди делают <em>миссию.</em>",
        team_desc: "Познакомьтесь с людьми, которые помогают продвигать работу AMYLI.",
        team_note: "Публиковать следует только проверенную информацию о команде.",
        team_cta: "Посмотреть профиль ↗",
        contact_kicker: "СВЯЖИТЕСЬ С НАМИ",
        contact_title: "Давайте начнем<br><em>разговор.</em>",
        contact_desc: "Есть вопрос о наставничестве, исследованиях, волонтерстве, образовательных мероприятиях или потенциальном партнерстве? Свяжитесь с AMYLI.",
        contact_email_title: "Напишите нам",
        contact_phone_title: "Позвоните нам",
        contact_focus_title: "Наш фокус",
        contact_focus_desc: "Академическое наставничество, образование, исследования, лидерство и вовлечение сообщества.",
        contact_social_title: "Следите за AMYLI",
        form_title: "Отправьте нам сообщение",
        form_desc: "Заполните форму, чтобы подготовить электронное письмо в вашем почтовом приложении.",
        form_name: "Ваше имя",
        form_email: "Ваш email",
        form_topic: "Тема",
        form_message: "Сообщение",
        form_submit: "Подготовить письмо ↗",
        form_status: "Эта форма открывает ваше почтовое приложение. Она не сохраняет сообщения.",
        footer_desc: "Образовывать. Соединять. Расти. Расширяем возможности молодых людей превращать свой потенциал в значимый прогресс.",
        footer_explore: "Исследовать",
        footer_about: "Oб AMYLI",
        footer_programmes: "Наши программы",
        footer_get_involved: "Принять участие",
        footer_rights: "Bce права защищены.",
        footer_back_top: "Наверх ↑"
    },
    fr: {
        announcement_text: "Autonomiser. S'adapter. Diriger. Réussir.",
        announcement_link: "Faites partie du voyage ↗",
        brand_subtitle: "Initiative de mentorat académique et de leadership des jeunes",
        nav_home: "Accueil",
        nav_about: "À propos",
        nav_about_who: "Qui sommes-nous",
        nav_about_mission: "Mission et vision",
        nav_about_values: "Nos valeurs fondamentales",
        nav_about_journey: "Notre parcours de développement",
        nav_about_team: "Notre équipe",
        nav_programmes: "Programmes",
        nav_prog_education: "Mentorat académique",
        nav_prog_adaptation: "Adaptation des étudiants",
        nav_prog_wellbeing: "Santé et développement personnel",
        nav_prog_research: "Développement de la recherche",
        nav_prog_leadership: "Leadership et carrières",
        nav_prog_workshops: "Ateliers et événements",
        nav_prog_community: "Engagement communautaire",
        nav_explore: "Explorer",
        nav_exp_stories: "Ressources pédagogiques",
        nav_exp_platform: "Plateforme numérique",
        nav_exp_impact: "Notre contribution aux ODD",
        nav_exp_partners: "Partenariats",
        nav_exp_events: "Événements et activités",
        nav_get_involved: "S'impliquer",
        nav_contact: "Contact",
        hero_eyebrow: "Mentorat académique et leadership des jeunes",
        hero_title: "Autonomiser les esprits.<br><em>Façonner l'avenir.</em>",
        hero_desc: "Former une génération de jeunes leaders compétents, confiants et socialement responsables.",
        hero_btn_discover: "Découvrir AMYLI ↗",
        hero_btn_programmes: "Explorer nos programmes",
        hero_label: "Apprentissage. Leadership. Opportunité.",
        about_logo_text: "Autonomiser. S'adapter. Diriger. Réussir.",
        about_kicker: "QUI SOMMES-NOUS",
        about_title: "Former des leaders compétents, confiants et <em>responsables.</em>",
        about_p1: "AMYLI (Initiative de mentorat académique et de leadership des jeunes) est une initiative axée sur les jeunes, à but non lucratif et non politique, dédiée à l'autonomisation des étudiants, des jeunes professionnels, des chercheurs en herbe et des leaders émergents grâce au mentorat académique, à l'éducation, au développement personnel, au soutien à la recherche, à la formation au leadership et à l'engagement communautaire.",
        about_p2: "Nous croyons que chaque jeune mérite d'avoir accès à des conseils, des opportunités, des connaissances et des réseaux de soutien qui lui permettent de réaliser son potentiel. Grâce au mentorat, aux programmes éducatifs, aux webinaires, aux ateliers, aux activités de recherche et aux partenariats, AMYLI aide les jeunes à naviguer dans la vie académique, à développer des compétences pratiques, à établir des liens significatifs et à se préparer à un avenir professionnel et personnel réussi.",
        about_link: "Découvrir notre mission ↗",
        mission_kicker: "NOTRE MISSION",
        mission_title: "Autonomiser les gens par l'apprentissage.",
        mission_desc: "Autonomiser les étudiants et les jeunes professionnels grâce à un mentorat académique accessible, une éducation, un développement de la recherche, une formation au leadership et un engagement communautaire, leur permettant d'atteindre leur plein potentiel et de contribuer de manière significative à la société.",
        vision_kicker: "NOTRE VISION",
        vision_title: "Une génération prête à diriger.",
        vision_desc: "Construire une génération de jeunes professionnels académiquement forts, socialement responsables, à vocation internationale et confiants, capables de contribuer positivement à leurs communautés et pays.",
        values_kicker: "CE QUI NOUS GUIDE",
        values_title: "Nos <em>valeurs</em> fondamentales.",
        values_desc: "Nos valeurs façonnent notre façon d'apprendre, de travailler ensemble, de servir les communautés et de soutenir la prochaine génération.",
        value_1_title: "Excellence académique",
        value_1_desc: "Encourager l'apprentissage tout au long de la vie, la curiosité intellectuelle, la pensée critique et la poursuite du savoir.",
        value_2_title: "Mentorat et soutien mutuel",
        value_2_desc: "Connecter les individus à travers des relations significatives qui favorisent l'orientation, l'encouragement, le partage de connaissances et la croissance personnelle.",
        value_3_title: "Autonomisation des jeunes",
        value_3_desc: "Doter les jeunes de la confiance, des compétences et des opportunités nécessaires pour prendre des initiatives et devenir des membres actifs de la société.",
        value_4_title: "Inclusion et égalité des chances",
        value_4_desc: "Promouvoir un environnement accueillant où les jeunes de différents horizons éducatifs, culturels, linguistiques et socio-économiques peuvent participer et se développer.",
        value_5_title: "Leadership et responsabilité",
        value_5_desc: "Encourager la prise de décision éthique, la responsabilité, l'initiative et le leadership axé sur le service.",
        value_6_title: "Recherche et innovation",
        value_6_desc: "Soutenir la curiosité scientifique, la pensée fondée sur des preuves, les compétences en recherche et le développement de solutions innovantes aux défis sociaux.",
        value_7_title: "Bénévolat et service communautaire",
        value_7_desc: "Inspirer les jeunes à utiliser leur temps, leurs connaissances et leurs compétences pour soutenir les autres et améliorer leurs communautés.",
        value_8_title: "Intégrité et respect",
        value_8_desc: "Maintenir l'éthique professionnelle, le respect et la compréhension interculturelle.",
        value_9_title: "Partenariat et coopération internationale",
        value_9_desc: "Établir des relations constructives entre les universités, les établissements d'enseignement, les communautés professionnelles, la société civile et les organisations de jeunesse.",
        programs_kicker: "NOS PROGRAMMES",
        programs_title: "Transformer le potentiel en <em>progrès.</em>",
        programs_desc: "Nous connectons les jeunes avec les connaissances, les conseils, les compétences et les réseaux de soutien pour encourager le développement académique, professionnel et personnel.",
        prog_1_title: "Mentorat académique",
        prog_1_summary: "Connecter les étudiants avec des mentors expérimentés pour des conseils académiques.",
        prog_1_desc: "AMYLI connecte les étudiants et les jeunes professionnels avec des mentors expérimentés, des chercheurs, des éducateurs et d'autres personnes dûment qualifiées qui peuvent fournir des conseils basés sur les intérêts, les objectifs et les besoins de développement des participants.",
        prog_2_title: "Adaptation des étudiants",
        prog_2_summary: "Aider les étudiants à naviguer dans la vie universitaire et les nouveaux environnements.",
        prog_2_desc: "Commencer l'université ou étudier dans un nouveau pays peut être une transition importante. AMYLI aide les étudiants à mieux comprendre les attentes académiques, à naviguer dans la vie universitaire, à établir des liens sociaux et à développer la confiance nécessaire pour participer activement à leurs communautés éducatives.",
        prog_3_title: "Santé et bien-être",
        prog_3_summary: "Promouvoir le bien-être mental, la gestion du stress et les habitudes saines.",
        prog_3_desc: "Nous reconnaissons que la réussite académique et la croissance personnelle sont étroitement liées à la santé physique, au bien-être mental, à la résilience émotionnelle et à des habitudes quotidiennes saines. AMYLI promeut la sensibilisation à la gestion du stress, à la prévention de l'épuisement professionnel, à la gestion du temps, aux modes de vie sains, à la confiance en soi et à l'équilibre travail-vie personnelle.",
        prog_4_title: "Développement de la recherche",
        prog_4_summary: "Renforcer la rédaction académique, la méthodologie et les compétences scientifiques.",
        prog_4_desc: "AMYLI encourage les jeunes à développer leurs intérêts de recherche, à renforcer leurs compétences en rédaction académique et à participer à des activités scientifiques et intellectuelles.",
        prog_5_title: "Leadership et carrières",
        prog_5_summary: "Développer des compétences pratiques en leadership et professionnelles pour l'avenir.",
        prog_5_desc: "AMYLI soutient le développement de compétences pratiques en leadership et professionnelles qui aident les jeunes à passer de l'éducation à des carrières significatives et au leadership communautaire.",
        prog_6_title: "Ateliers et événements",
        prog_6_summary: "Rassembler étudiants, mentors et professionnels pour échanger des connaissances.",
        prog_6_desc: "AMYLI organise des activités éducatives conçues pour rassembler des étudiants, des mentors, des universitaires, des chercheurs, des professionnels, des bénévoles et des leaders de jeunesse.",
        prog_7_title: "Engagement communautaire",
        prog_7_summary: "Encourager le bénévolat et les projets collaboratifs qui répondent à des besoins réels.",
        prog_7_desc: "Nous croyons que le développement significatif inclut un engagement à servir les autres. AMYLI encourage les jeunes à participer au bénévolat, au soutien par les pairs, à la sensibilisation éducative, aux projets communautaires et aux activités collaboratives qui répondent à des besoins réels.",
        journey_kicker: "LE PARCOURS DE DÉVELOPPEMENT AMYLI",
        journey_title: "De l'apprentissage au <em>leadership.</em>",
        journey_desc: "Notre approche du développement des jeunes est guidée par six étapes interconnectées.",
        journey_1_title: "S'adapter",
        journey_1_desc: "Comprendre de nouveaux environnements, relever des défis et développer la confiance pour participer aux communautés académiques et sociales.",
        journey_2_title: "Apprendre",
        journey_2_desc: "Acquérir des connaissances, renforcer les compétences académiques et embrasser le développement personnel et professionnel continu.",
        journey_3_title: "Connecter",
        journey_3_desc: "Établir des relations significatives avec des mentors, des pairs, des éducateurs, des chercheurs et des réseaux professionnels.",
        journey_4_title: "Diriger",
        journey_4_desc: "Développer l'initiative, la communication, le travail d'équipe, la prise de décision et le leadership responsable.",
        journey_5_title: "Servir",
        journey_5_desc: "Appliquer les connaissances et les compétences par le biais du bénévolat, de l'engagement communautaire et d'activités qui profitent aux autres.",
        journey_6_title: "Mentorer",
        journey_6_desc: "Partager l'expérience, soutenir les autres et contribuer à une culture durable d'orientation, d'apprentissage et de croissance mutuelle.",
        sdg_kicker: "NOS DOMAINES DE CONTRIBUTION",
        sdg_title: "Apprendre aujourd'hui.<br><em>Contribuer demain.</em>",
        sdg_desc: "Les activités d'AMYLI s'alignent sur plusieurs Objectifs de Développement Durable (ODD) des Nations Unies.",
        sdg_4_title: "Éducation de qualité",
        sdg_4_desc: "Soutenir l'apprentissage inclusif, le développement académique, le mentorat et les opportunités d'apprentissage tout au long de la vie.",
        sdg_8_title: "Travail décent et croissance économique",
        sdg_8_desc: "Renforcer l'employabilité, la préparation à la carrière, les compétences professionnelles et le leadership des jeunes.",
        sdg_10_title: "Réduction des inégalités",
        sdg_10_desc: "Promouvoir l'accès inclusif au mentorat, aux ressources éducatives et aux opportunités de développement personnel.",
        sdg_16_title: "Paix, justice et institutions efficaces",
        sdg_16_desc: "Encourager le leadership responsable, la responsabilité, la conduite éthique et la participation civique constructive.",
        sdg_17_title: "Partenariats pour la réalisation des objectifs",
        sdg_17_desc: "Développer la coopération entre les établissements d'enseignement, la société civile, les communautés professionnelles et les organisations de jeunesse.",
        sdg_3_title: "Bonne santé et bien-être",
        sdg_3_desc: "Promouvoir la sensibilisation à la santé, au bien-être mental, à la gestion du stress et aux modes de vie sains.",
        team_kicker: "LES GENS DERRIÈRE LA MISSION",
        team_title: "Les gens font la <em>mission.</em>",
        team_desc: "Rencontrez les personnes qui aident à faire avancer le travail d'AMYLI.",
        team_note: "Seules les informations vérifiées sur l'équipe doivent être publiées.",
        team_cta: "Voir le profil ↗",
        contact_kicker: "CONTACTEZ-NOUS",
        contact_title: "Commençons une<br><em>conversation.</em>",
        contact_desc: "Vous avez une question sur le mentorat, la recherche, le bénévolat, les activités éducatives ou un partenariat potentiel ? Contactez AMYLI.",
        contact_email_title: "Envoyez-nous un email",
        contact_phone_title: "Appelez-nous",
        contact_focus_title: "Notre focus",
        contact_focus_desc: "Mentorat académique, éducation, recherche, leadership et engagement communautaire.",
        contact_social_title: "Suivez AMYLI",
        form_title: "Envoyez-nous un message",
        form_desc: "Remplissez le formulaire pour préparer un email dans votre application de messagerie.",
        form_name: "Votre nom",
        form_email: "Votre email",
        form_topic: "Sujet",
        form_message: "Message",
        form_submit: "Préparer l'email ↗",
        form_status: "Ce formulaire ouvre votre application de messagerie. Il ne stocke pas les messages.",
        footer_desc: "Éduquer. Connecter. Grandir. Autonomiser les jeunes pour transformer leur potentiel en progrès significatif.",
        footer_explore: "Explorer",
        footer_about: "À propos d'AMYLI",
        footer_programmes: "Nos programmes",
        footer_get_involved: "S'impliquer",
        footer_rights: "Tous droits réservés.",
        footer_back_top: "Retour en haut ↑"
    },
    es: {
        announcement_text: "Empoderar. Adaptarse. Liderar. Tener éxito.",
        announcement_link: "Sé parte del viaje ↗",
        brand_subtitle: "Iniciativa de Mentoría Académica y Liderazgo Juvenil",
        nav_home: "Inicio",
        nav_about: "Acerca de",
        nav_about_who: "Quiénes somos",
        nav_about_mission: "Misión y visión",
        nav_about_values: "Nuestros valores fundamentales",
        nav_about_journey: "Nuestro viaje de desarrollo",
        nav_about_team: "Nuestro equipo",
        nav_programmes: "Programas",
        nav_prog_education: "Mentoría académica",
        nav_prog_adaptation: "Adaptación estudiantil",
        nav_prog_wellbeing: "Salud y desarrollo personal",
        nav_prog_research: "Desarrollo de investigación",
        nav_prog_leadership: "Liderazgo y carreras",
        nav_prog_workshops: "Talleres y eventos",
        nav_prog_community: "Compromiso comunitario",
        nav_explore: "Explorar",
        nav_exp_stories: "Recursos de aprendizaje",
        nav_exp_platform: "Plataforma digital",
        nav_exp_impact: "Nuestra contribución a los ODS",
        nav_exp_partners: "Alianzas",
        nav_exp_events: "Eventos y actividades",
        nav_get_involved: "Involúcrate",
        nav_contact: "Contacto",
        hero_eyebrow: "Mentoría académica y liderazgo juvenil",
        hero_title: "Empoderar mentes.<br><em>Moldear futuros.</em>",
        hero_desc: "Construyendo una generación de jóvenes líderes conocimientos, seguros y socialmente responsables.",
        hero_btn_discover: "Descubre AMYLI ↗",
        hero_btn_programmes: "Explora nuestros programas",
        hero_label: "Aprendizaje. Liderazgo. Oportunidad.",
        about_logo_text: "Empoderar. Adaptarse. Liderar. Tener éxito.",
        about_kicker: "QUIÉNES SOMOS",
        about_title: "Construyendo líderes conocimientos, seguros y <em>responsables.</em>",
        about_p1: "AMYLI (Iniciativa de Mentoría Académica y Liderazgo Juvenil) es una iniciativa centrada en los jóvenes, sin fines de lucro y no política, dedicada a empoderar a estudiantes, jóvenes profesionales, aspirantes a investigadores y líderes emergentes a través de la mentoría académica, la educación, el desarrollo personal, el apoyo a la investigación, la capacitación en liderazgo y el compromiso comunitario.",
        about_p2: "Creemos que cada joven merece tener acceso a orientación, oportunidades, conocimiento y redes de apoyo que les permitan realizar su potencial. A través de la mentoría, programas educativos, seminarios web, talleres, actividades de investigación y alianzas, AMYLI ayuda a los jóvenes a navegar la vida académica, desarrollar habilidades prácticas, construir conexiones significativas y prepararse para futuros profesionales y personales exitosos.",
        about_link: "Descubre nuestra misión ↗",
        mission_kicker: "NUESTRA MISIÓN",
        mission_title: "Empoderar a las personas a través del aprendizaje.",
        mission_desc: "Empoderar a estudiantes y jóvenes profesionales a través de mentoría académica accesible, educación, desarrollo de investigación, capacitación en liderazgo y compromiso comunitario, permitiéndoles alcanzar su máximo potencial y contribuir significativamente a la sociedad.",
        vision_kicker: "NUESTRA VISIÓN",
        vision_title: "Una generación lista para liderar.",
        vision_desc: "Construir una generación de jóvenes profesionales académicamente fuertes, socialmente responsables, con mentalidad internacional y seguros, capaces de contribuir positivamente a sus comunidades y países.",
        values_kicker: "LO QUE NOS GUÍA",
        values_title: "Nuestros <em>valores</em> fundamentales.",
        values_desc: "Nuestros valores dan forma a cómo aprendemos, trabajamos juntos, servimos a las comunidades y apoyamos a la próxima generación.",
        value_1_title: "Excelencia académica",
        value_1_desc: "Fomentar el aprendizaje permanente, la curiosidad intelectual, el pensamiento crítico y la búsqueda del conocimiento.",
        value_2_title: "Mentoría y apoyo mutuo",
        value_2_desc: "Conectar a las personas a través de relaciones significativas que promuevan la orientación, el estímulo, el intercambio de conocimientos y el crecimiento personal.",
        value_3_title: "Empoderamiento juvenil",
        value_3_desc: "Equipar a los jóvenes con la confianza, las habilidades y las oportunidades para tomar la iniciativa y convertirse en contribuyentes activos de la sociedad.",
        value_4_title: "Inclusión e igualdad de oportunidades",
        value_4_desc: "Promover un entorno acogedor donde los jóvenes de diferentes orígenes educativos, culturales, lingüísticos y socioeconómicos puedan participar y desarrollarse.",
        value_5_title: "Liderazgo y responsabilidad",
        value_5_desc: "Fomentar la toma de decisiones éticas, la responsabilidad, la iniciativa y el liderazgo orientado al servicio.",
        value_6_title: "Investigación e innovación",
        value_6_desc: "Apoyar la curiosidad científica, el pensamiento basado en evidencias, las habilidades de investigación y el desarrollo de soluciones innovadoras a los desafíos sociales.",
        value_7_title: "Voluntariado y servicio comunitario",
        value_7_desc: "Inspirar a los jóvenes a usar su tiempo, conocimiento y habilidades para apoyar a otros y mejorar sus comunidades.",
        value_8_title: "Integridad y respeto",
        value_8_desc: "Mantener la ética profesional, el respeto y la comprensión intercultural.",
        value_9_title: "Alianza y cooperación internacional",
        value_9_desc: "Construir relaciones constructivas entre universidades, instituciones educativas, comunidades profesionales, sociedad civil y organizaciones juveniles.",
        programs_kicker: "NUESTROS PROGRAMAS",
        programs_title: "Convertir el potencial en <em>progreso.</em>",
        programs_desc: "Conectamos a los jóvenes con conocimiento, orientación, habilidades y redes de apoyo para fomentar el desarrollo académico, profesional y personal.",
        prog_1_title: "Mentoría académica",
        prog_1_summary: "Conectar a estudiantes con mentores experimentados para orientación académica.",
        prog_1_desc: "AMYLI conecta a estudiantes y jóvenes profesionales con mentores experimentados, investigadores, educadores y otras personas debidamente calificadas que pueden brindar orientación basada en los intereses, metas y necesidades de desarrollo de los participantes.",
        prog_2_title: "Adaptación estudiantil",
        prog_2_summary: "Ayudar a los estudiantes a navegar la vida universitaria y nuevos entornos.",
        prog_2_desc: "Comenzar la universidad o estudiar en un nuevo país puede ser una transición significativa. AMYLI ayuda a los estudiantes a comprender mejor las expectativas académicas, navegar la vida universitaria, construir conexiones sociales y desarrollar la confianza para participar activamente en sus comunidades educativas.",
        prog_3_title: "Salud y bienestar",
        prog_3_summary: "Promover el bienestar mental, el manejo del estrés y los hábitos saludables.",
        prog_3_desc: "Reconocemos que el éxito académico y el crecimiento personal están estrechamente relacionados con la salud física, el bienestar mental, la resiliencia emocional y los hábitos diarios saludables. AMYLI promueve la conciencia sobre el manejo del estrés, la prevención del agotamiento, la gestión del tiempo, los estilos de vida saludables, la confianza en uno mismo y el equilibrio trabajo-vida.",
        prog_4_title: "Desarrollo de investigación",
        prog_4_summary: "Fortalecer la redacción académica, la metodología y las habilidades científicas.",
        prog_4_desc: "AMYLI alienta a los jóvenes a desarrollar sus intereses de investigación, fortalecer las habilidades de escritura académica y participar en actividades científicas e intelectuales.",
        prog_5_title: "Liderazgo y carreras",
        prog_5_summary: "Desarrollar habilidades prácticas de liderazgo y profesionales para futuras carreras.",
        prog_5_desc: "AMYLI apoya el desarrollo de habilidades prácticas de liderazgo y profesionales que ayudan a los jóvenes a hacer la transición de la educación a carreras significativas y liderazgo comunitario.",
        prog_6_title: "Talleres y eventos",
        prog_6_summary: "Reunir a estudiantes, mentores y profesionales para intercambiar conocimientos.",
        prog_6_desc: "AMYLI organiza actividades educativas diseñadas para reunir a estudiantes, mentores, académicos, investigadores, profesionales, voluntarios y líderes juveniles.",
        prog_7_title: "Compromiso comunitario",
        prog_7_summary: "Fomentar el voluntariado y proyectos colaborativos que respondan a necesidades reales.",
        prog_7_desc: "Creemos que el desarrollo significativo incluye un compromiso de servir a los demás. AMYLI alienta a los jóvenes a participar en voluntariado, apoyo entre pares, divulgación educativa, proyectos comunitarios y actividades colaborativas que respondan a necesidades reales.",
        journey_kicker: "EL VIAJE DE DESARROLLO DE AMYLI",
        journey_title: "Del aprendizaje al <em>liderazgo.</em>",
        journey_desc: "Nuestro enfoque para el desarrollo juvenil se guía por seis etapas interconectadas.",
        journey_1_title: "Adaptarse",
        journey_1_desc: "Comprender nuevos entornos, superar desafíos y desarrollar la confianza para participar en comunidades académicas y sociales.",
        journey_2_title: "Aprender",
        journey_2_desc: "Adquirir conocimientos, fortalecer habilidades académicas y abrazar el desarrollo personal y profesional continuo.",
        journey_3_title: "Conectar",
        journey_3_desc: "Construir relaciones significativas con mentores, compañeros, educadores, investigadores y redes profesionales.",
        journey_4_title: "Liderar",
        journey_4_desc: "Desarrollar iniciativa, comunicación, trabajo en equipo, toma de decisiones y liderazgo responsable.",
        journey_5_title: "Servir",
        journey_5_desc: "Aplicar conocimientos y habilidades a través del voluntariado, el compromiso comunitario y actividades que beneficien a otros.",
        journey_6_title: "Mentorizar",
        journey_6_desc: "Compartir experiencia, apoyar a otros y contribuir a una cultura sostenible de orientación, aprendizaje y crecimiento mutuo.",
        sdg_kicker: "NUESTRAS ÁREAS DE CONTRIBUCIÓN",
        sdg_title: "Aprender hoy.<br><em>Contribuir mañana.</em>",
        sdg_desc: "Las actividades de AMYLI se alinean con varios Objetivos de Desarrollo Sostenible (ODS) de las Naciones Unidas.",
        sdg_4_title: "Educación de calidad",
        sdg_4_desc: "Apoyar el aprendizaje inclusivo, el desarrollo académico, la mentoría y las oportunidades de aprendizaje permanente.",
        sdg_8_title: "Trabajo decente y crecimiento económico",
        sdg_8_desc: "Fortalecer la empleabilidad, la preparación profesional, las habilidades profesionales y el liderazgo juvenil.",
        sdg_10_title: "Reducción de las desigualdades",
        sdg_10_desc: "Promover el acceso inclusivo a la mentoría, los recursos educativos y las oportunidades de desarrollo personal.",
        sdg_16_title: "Paz, justicia e instituciones sólidas",
        sdg_16_desc: "Fomentar el liderazgo responsable, la rendición de cuentas, la conducta ética y la participación cívica constructiva.",
        sdg_17_title: "Alianzas para lograr los objetivos",
        sdg_17_desc: "Desarrollar la cooperación entre instituciones educativas, sociedad civil, comunidades profesionales y organizaciones juveniles.",
        sdg_3_title: "Salud y bienestar",
        sdg_3_desc: "Promover la conciencia sobre la salud, el bienestar mental, el manejo del estrés y los estilos de vida saludables.",
        team_kicker: "LAS PERSONAS DETRÁS DE LA MISIÓN",
        team_title: "Las personas hacen la <em>misión.</em>",
        team_desc: "Conoce a las personas que ayudan a avanzar el trabajo de AMYLI.",
        team_note: "Solo se debe publicar información verificada del equipo.",
        team_cta: "Ver perfil ↗",
        contact_kicker: "PONTE EN CONTACTO",
        contact_title: "Comencemos una<br><em>conversación.</em>",
        contact_desc: "¿Tienes alguna pregunta sobre mentoría, investigación, voluntariado, actividades educativas o una posible alianza? Contacta a AMYLI.",
        contact_email_title: "Envíanos un correo",
        contact_phone_title: "Llámanos",
        contact_focus_title: "Nuestro enfoque",
        contact_focus_desc: "Mentoría académica, educación, investigación, liderazgo y compromiso comunitario.",
        contact_social_title: "Sigue a AMYLI",
        form_title: "Envíanos un mensaje",
        form_desc: "Completa el formulario para preparar un correo electrónico en tu aplicación de correo.",
        form_name: "Tu nombre",
        form_email: "Tu correo",
        form_topic: "Asunto",
        form_message: "Mensaje",
        form_submit: "Preparar correo ↗",
        form_status: "Este formulario abre tu aplicación de correo. No almacena mensajes.",
        footer_desc: "Educar. Conectar. Crecer. Empoderar a los jóvenes para convertir su potencial en progreso significativo.",
        footer_explore: "Explorar",
        footer_about: "Acerca de AMYLI",
        footer_programmes: "Nuestros programas",
        footer_get_involved: "Involúcrate",
        footer_rights: "Todos los derechos reservados.",
        footer_back_top: "Volver arriba ↑"
    }
};

function initializeLanguage() {
    const buttons = document.querySelectorAll("[data-language]");
    if (!buttons.length) return;

    let savedLanguage = "en";
    try {
        savedLanguage = localStorage.getItem("amyli-language") || "en";
    } catch (error) { /* Default to English */ }

    setLanguage(savedLanguage);

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            setLanguage(button.dataset.language);
        });
    });

    function setLanguage(language) {
        const supported = ["en", "ru", "fr", "es"];
        if (!supported.includes(language)) {
            language = "en";
        }

        document.documentElement.lang = language;

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;
            if (translations[language] && translations[language][key]) {
                element.innerHTML = translations[language][key];
            }
        });

        const activeProfile = document.querySelector(".profile-overlay");
        if (activeProfile && window.currentActiveProfile) {
            const person = window.currentActiveProfile;
            activeProfile.querySelector("#profileDialogName").textContent = person.name;
            activeProfile.querySelector(".profile-dialog-role").textContent = person.role;
            activeProfile.querySelector("#profileDialogBio").textContent = person.bio;
        }

        buttons.forEach((button) => {
            const selected = button.dataset.language === language;
            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        try {
            localStorage.setItem("amyli-language", language);
        } catch (error) { /* Continue without browser storage */ }
    }
}

/* ==========================================================================
   TEAM PROFILES & CAROUSEL
   ========================================================================== */
function initializeTeam() {
    const teamRow = document.getElementById("teamRow");
    if (!teamRow) return;

    const sampleProfiles = [
        { name: "Sample Team Member 01", roleKey: "team_role_1", bioKey: "team_bio_1", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80", social: { linkedin: "#", twitter: "#" } },
        { name: "Sample Team Member 02", roleKey: "team_role_2", bioKey: "team_bio_2", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80", social: { linkedin: "#", twitter: "#" } },
        { name: "Sample Team Member 03", roleKey: "team_role_3", bioKey: "team_bio_3", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80", social: { linkedin: "#", twitter: "#" } },
        { name: "Sample Team Member 04", roleKey: "team_role_4", bioKey: "team_bio_4", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80", social: { linkedin: "#", twitter: "#" } },
        { name: "Sample Team Member 05", roleKey: "team_role_5", bioKey: "team_bio_5", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=80", social: { linkedin: "#", twitter: "#" } },
        { name: "Sample Team Member 06", roleKey: "team_role_6", bioKey: "team_bio_6", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80", social: { linkedin: "#", twitter: "#" } }
    ];

    const teamTranslations = {
        en: { team_role_1: "Leadership and coordination", team_bio_1: "Responsible for overall strategy and operations.", team_role_2: "Academic mentorship", team_bio_2: "Guides students through their academic journey.", team_role_3: "Research and academic development", team_bio_3: "Supports research initiatives and academic writing.", team_role_4: "Youth leadership", team_bio_4: "Develops leadership programmes for young people.", team_role_5: "Programmes and activities", team_bio_5: "Coordinates events and educational activities.", team_role_6: "Community engagement", team_bio_6: "Builds partnerships and community relations." },
        ru: { team_role_1: "Лидерство и координация", team_bio_1: "Отвечает за общую стратегию и операции.", team_role_2: "Академическое наставничество", team_bio_2: "Сопровождает студентов в их академическом пути.", team_role_3: "Исследования и академическое развитие", team_bio_3: "Поддерживает исследовательские инициативы и академическое письмо.", team_role_4: "Молодежное лидерство", team_bio_4: "Разрабатывает программы лидерства для молодежи.", team_role_5: "Программы и мероприятия", team_bio_5: "Координирует мероприятия и образовательные активности.", team_role_6: "Вовлечение сообщества", team_bio_6: "Строит партнерства и отношения с сообществом." },
        fr: { team_role_1: "Leadership et coordination", team_bio_1: "Responsable de la stratégie globale et des opérations.", team_role_2: "Mentorat académique", team_bio_2: "Guide les étudiants tout au long de leur parcours académique.", team_role_3: "Recherche et développement académique", team_bio_3: "Soutient les initiatives de recherche et la rédaction académique.", team_role_4: "Leadership des jeunes", team_bio_4: "Développe des programmes de leadership pour les jeunes.", team_role_5: "Programmes et activités", team_bio_5: "Coordonne les événements et les activités éducatives.", team_role_6: "Engagement communautaire", team_bio_6: "Établit des partenariats et des relations communautaires." },
        es: { team_role_1: "Liderazgo y coordinación", team_bio_1: "Responsable de la estrategia general y las operaciones.", team_role_2: "Mentoría académica", team_bio_2: "Guía a los estudiantes a lo largo de su trayectoria académica.", team_role_3: "Investigación y desarrollo académico", team_bio_3: "Apoya iniciativas de investigación y redacción académica.", team_role_4: "Liderazgo juvenil", team_bio_4: "Desarrolla programas de liderazgo para jóvenes.", team_role_5: "Programas y actividades", team_bio_5: "Coordina eventos y actividades educativas.", team_role_6: "Compromiso comunitario", team_bio_6: "Construye alianzas y relaciones comunitarias." }
    };

    Object.keys(teamTranslations).forEach(lang => {
        if (translations[lang]) Object.assign(translations[lang], teamTranslations[lang]);
    });

    function getCurrentLang() { return document.documentElement.lang || "en"; }

    teamRow.replaceChildren();

    sampleProfiles.forEach((person) => {
        const card = document.createElement("div");
        card.className = "team-card";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `View profile of ${person.name}`);

        const photo = document.createElement("img");
        photo.className = "team-photo";
        photo.src = person.image;
        photo.alt = `Portrait of ${person.name}`;
        photo.loading = "lazy";
        photo.addEventListener("error", () => { photo.style.display = "none"; }, { once: true });

        const content = document.createElement("div");
        content.className = "team-card-content";

        const name = document.createElement("h3");
        name.textContent = person.name;

        const role = document.createElement("p");
        role.className = "team-role";
        role.dataset.i18n = person.roleKey;
        role.textContent = translations[getCurrentLang()][person.roleKey] || person.roleKey;

        const ctaButton = document.createElement("button");
        ctaButton.className = "team-card-cta";
        ctaButton.dataset.i18n = "team_cta";
        ctaButton.textContent = translations[getCurrentLang()].team_cta || "View profile ↗";
        
        content.append(name, role, ctaButton);
        card.append(photo, content);
        teamRow.appendChild(card);

        const openModal = () => {
            const lang = getCurrentLang();
            const translatedPerson = {
                name: person.name,
                role: translations[lang][person.roleKey] || person.roleKey,
                bio: translations[lang][person.bioKey] || person.bioKey,
                image: person.image,
                social: person.social
            };
            window.currentActiveProfile = translatedPerson;
            openProfile(translatedPerson, card);
        };

        photo.addEventListener("click", openModal);
        card.addEventListener("click", (e) => { if(e.target !== ctaButton) openModal(); });
        ctaButton.addEventListener("click", (e) => { e.stopPropagation(); openModal(); });
        card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(); } });
    });

    // Carousel Navigation Logic
    const prevBtn = document.getElementById("teamPrevBtn");
    const nextBtn = document.getElementById("teamNextBtn");

    if (prevBtn && nextBtn) {
        // Dynamically calculate scroll amount based on screen size
        const getScrollAmount = () => {
            if (window.innerWidth <= 380) return 210; // Very small phones
            if (window.innerWidth <= 540) return 240; // Small phones
            if (window.innerWidth <= 760) return 260; // Tablets
            return 280; // Desktops
        };

        prevBtn.addEventListener("click", () => {
            teamRow.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
        });
        
        nextBtn.addEventListener("click", () => {
            teamRow.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
        });

        const updateButtons = () => {
            const maxScrollLeft = teamRow.scrollWidth - teamRow.clientWidth;
            prevBtn.disabled = teamRow.scrollLeft <= 0;
            nextBtn.disabled = teamRow.scrollLeft >= maxScrollLeft - 1;
        };
        
        teamRow.addEventListener("scroll", updateButtons);
        setTimeout(updateButtons, 100); // Initial check
        window.addEventListener("resize", updateButtons);
    }
}

/* ==========================================================================
   TEAM PROFILE MODAL
   ========================================================================== */
function openProfile(person, opener) {
    closeProfile();
    const overlay = document.createElement("div");
    overlay.className = "profile-overlay";
    overlay.setAttribute("role", "presentation");
    const dialog = document.createElement("section");
    dialog.className = "profile-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "profileDialogName");
    dialog.setAttribute("aria-describedby", "profileDialogBio");

    const closeButton = document.createElement("button");
    closeButton.className = "profile-dialog-close";
    closeButton.type = "button";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", "Close profile");

    const photo = document.createElement("img");
    photo.className = "profile-dialog-photo";
    photo.src = person.image;
    photo.alt = `Portrait of ${person.name}`;
    photo.addEventListener("error", () => { photo.style.display = "none"; }, { once: true });

    const info = document.createElement("div");
    info.className = "profile-dialog-info";

    const name = document.createElement("h2");
    name.id = "profileDialogName";
    name.textContent = person.name;

    const role = document.createElement("p");
    role.className = "profile-dialog-role";
    role.textContent = person.role;

    const bio = document.createElement("p");
    bio.className = "profile-dialog-bio";
    bio.id = "profileDialogBio";
    bio.textContent = person.bio;

    const socialLinks = document.createElement("div");
    socialLinks.className = "profile-social-links";
    if (person.social && (person.social.linkedin || person.social.twitter)) {
        const socialTitle = document.createElement("p");
        socialTitle.textContent = "Connect:";
        socialTitle.style.marginBottom = "8px";
        socialTitle.style.fontWeight = "600";
        const linksContainer = document.createElement("div");
        linksContainer.className = "social-links";
        if (person.social.linkedin) {
            const li = document.createElement("a");
            li.href = person.social.linkedin; li.target = "_blank"; li.rel = "noopener noreferrer"; li.setAttribute("aria-label", "LinkedIn"); li.textContent = "in";
            linksContainer.appendChild(li);
        }
        if (person.social.twitter) {
            const tw = document.createElement("a");
            tw.href = person.social.twitter; tw.target = "_blank"; tw.rel = "noopener noreferrer"; tw.setAttribute("aria-label", "X (Twitter)"); tw.textContent = "𝕏";
            linksContainer.appendChild(tw);
        }
        socialLinks.append(socialTitle, linksContainer);
    }

    info.append(name, role, bio, socialLinks);
    dialog.append(photo, info, closeButton);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    document.body.style.overflow = "hidden";
    closeButton.focus();

    closeButton.addEventListener("click", closeProfile);
    overlay.addEventListener("click", (event) => { if (event.target === overlay) closeProfile(); });
    dialog.addEventListener("keydown", (event) => {
        if (event.key !== "Tab") return;
        const focusable = dialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });

    function handleEscape(event) { if (event.key === "Escape") closeProfile(); }
    document.addEventListener("keydown", handleEscape);
    overlay._restoreFocus = () => { document.removeEventListener("keydown", handleEscape); if (opener && opener.isConnected) opener.focus(); };
}

function closeProfile() {
    const overlay = document.querySelector(".profile-overlay");
    if (!overlay) return;
    if (typeof overlay._restoreFocus === "function") overlay._restoreFocus();
    overlay.remove();
    document.body.style.overflow = "";
    window.currentActiveProfile = null;
}

/* ==========================================================================
   PROGRAM MODALS
   ========================================================================== */
function initializeProgramModals() {
    const modalOverlay = document.getElementById("programModalOverlay");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalIcon = document.getElementById("modalIcon");
    const closeModalBtn = document.getElementById("closeProgramModal");
    const readMoreBtns = document.querySelectorAll(".read-more-btn");

    if (!modalOverlay || !closeModalBtn) return;

    readMoreBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.target;
            const descElement = document.getElementById(`${targetId}-desc`);
            
            // Find the parent card to get the title and icon
            const card = btn.closest(".program-card");
            const title = card.querySelector("h3").innerHTML;
            const icon = card.querySelector(".program-icon").innerHTML;
            
            // Populate modal
            modalTitle.innerHTML = title;
            modalDesc.innerHTML = descElement.innerHTML;
            modalIcon.innerHTML = icon;
            
            // Show modal
            modalOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = "";
    };

    closeModalBtn.addEventListener("click", closeModal);
    
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
            closeModal();
        }
    });
}

/* ==========================================================================
   CONTACT FORM
   ========================================================================== */
function initializeContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form || !status) return;

    const recipient = "info.amyli26@gmail.com";

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        status.className = "form-status";
        status.textContent = "";

        const name = document.getElementById("fullName")?.value.trim() || "";
        const email = document.getElementById("email")?.value.trim() || "";
        const topic = document.getElementById("topic")?.value.trim() || "";
        const message = document.getElementById("message")?.value.trim() || "";

        if (!name || !email || !topic || !message) {
            showStatus("Please complete all fields before preparing your email.", "error");
            return;
        }

        const emailInput = document.getElementById("email");
        if (emailInput && !emailInput.checkValidity()) {
            showStatus("Please enter a valid email address.", "error");
            emailInput.focus();
            return;
        }

        const subject = "AMYLI enquiry: " + topic;
        const body = ["Hello AMYLI,", "", message, "", "Name: " + name, "Reply email: " + email, "", "Sent through the AMYLI website contact form."].join("\n");
        const mailtoUrl = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

        showStatus("Your email application should open with your message prepared. Review it and press Send in your email application.", "success");
        window.location.href = mailtoUrl;
    });

    function showStatus(message, type) {
        status.textContent = message;
        status.className = "form-status " + type;
    }
}

/* ==========================================================================
   BACK TO TOP & FOOTER
   ========================================================================== */
function initializeBackToTop() {
    const button = document.getElementById("backToTop");
    if (!button) return;
    function updateVisibility() { button.classList.toggle("visible", window.scrollY > 350); }
    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();
    button.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });
}

function initializeFooterYear() {
    const year = document.getElementById("currentYear");
    if (year) { year.textContent = new Date().getFullYear(); }
}