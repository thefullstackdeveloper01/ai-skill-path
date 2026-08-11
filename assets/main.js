document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Demo search page — filters the static site index by keyword.
  var searchForm = document.querySelector('[data-search-form]');
  if (searchForm) {
    var index = [
      { title: 'AI Fundamentals', url: 'courses.html#ai-fundamentals', crumb: 'Courses', desc: 'How machine learning and generative AI actually work, from the ground up.' },
      { title: 'AI Platform Power Hacks', url: 'courses.html#platform-power-hacks', crumb: 'Courses', desc: 'Power-user features across ChatGPT, Claude, Gemini, Grok, DeepSeek, Perplexity, Meta AI, and Copilot.' },
      { title: 'Prompt Engineering Mastery', url: 'courses.html#prompt-engineering-mastery', crumb: 'Courses', desc: 'Theory, craft, and practice of prompt engineering for large language models.' },
      { title: 'AI & ML Engineering', url: 'courses.html#ai-ml-engineering', crumb: 'Courses', desc: 'The math, Python, and systems engineering behind production AI.' },
      { title: 'About AI Skill Path', url: 'about.html', crumb: 'Company', desc: 'Why we built a structured, no-fluff path for learning AI.' },
      { title: 'Frequently Asked Questions', url: 'faq.html', crumb: 'Support', desc: 'Lesson locking, quizzes, offline access, pricing, and more.' },
      { title: 'Contact Us', url: 'contact.html', crumb: 'Support', desc: 'Reach the team with a question, bug report, or feedback.' },
      { title: 'Careers', url: 'careers.html', crumb: 'Company', desc: 'Open roles at AI Skill Path.' },
      { title: 'Press & Media Kit', url: 'press.html', crumb: 'Company', desc: 'Logos, screenshots, and boilerplate for press coverage.' },
      { title: 'Blog', url: 'blog.html', crumb: 'Resources', desc: 'Articles on learning AI, prompting, and staying current.' },
      { title: 'Testimonials & Case Studies', url: 'testimonials.html', crumb: 'Resources', desc: 'How learners use AI Skill Path day to day.' },
      { title: 'Privacy Policy', url: 'privacypolicy.html', crumb: 'Legal', desc: 'How we collect, use, and protect your data.' },
      { title: 'Terms & Conditions', url: 'termscondition.html', crumb: 'Legal', desc: 'The rules for using AI Skill Path.' },
      { title: 'Cookie Policy', url: 'cookiepolicy.html', crumb: 'Legal', desc: 'How cookies and local storage are used on this site and in the app.' },
      { title: 'Disclaimer', url: 'disclaimer.html', crumb: 'Legal', desc: 'Educational content only — not professional or financial advice.' }
    ];

    var resultsEl = document.querySelector('[data-search-results]');
    var input = document.querySelector('[data-search-input]');

    function render(query) {
      var q = (query || '').trim().toLowerCase();
      var matches = !q ? index : index.filter(function (item) {
        return (item.title + ' ' + item.desc).toLowerCase().indexOf(q) !== -1;
      });
      resultsEl.innerHTML = '';
      if (!matches.length) {
        resultsEl.innerHTML = '<p class="muted">No pages matched "' + query + '". Try a different term, or browse the <a href="sitemap.html">sitemap</a>.</p>';
        return;
      }
      matches.forEach(function (item) {
        var div = document.createElement('div');
        div.className = 'result-item';
        div.innerHTML = '<div class="result-crumb">' + item.crumb + '</div>' +
          '<a href="' + item.url + '">' + item.title + '</a>' +
          '<p>' + item.desc + '</p>';
        resultsEl.appendChild(div);
      });
    }

    var params = new URLSearchParams(window.location.search);
    var initial = params.get('q') || '';
    if (input) input.value = initial;
    render(initial);

    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value;
      var url = new URL(window.location.href);
      url.searchParams.set('q', q);
      window.history.replaceState({}, '', url);
      render(q);
    });
  }
});
