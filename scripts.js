/*
  JavaScript to inject portfolio items and social links from a JSON data file.
  Also handles the contact form submission via mailto and updates the footer year.
*/

document.addEventListener('DOMContentLoaded', function () {
  // Read embedded JSON data
  const dataEl = document.getElementById('site-data');
  const siteData = JSON.parse(dataEl.textContent);

  // Populate portfolio items
  const portfolioGrid = document.getElementById('portfolio-grid');
  if (portfolioGrid && siteData.portfolio) {
    siteData.portfolio.forEach(item => {
      const div = document.createElement('div');
      div.className = 'portfolio-item';
      div.innerHTML = `
        <h4>${item.title}</h4>
        <a href="${item.link}" target="_blank" rel="noopener" class="portfolio-link">View project →</a>
      `;
      portfolioGrid.appendChild(div);
    });
  }

  // Set blog link
  const blogAnchor = document.getElementById('blog-url');
  if (blogAnchor && siteData.blog) {
    blogAnchor.href = siteData.blog;
    blogAnchor.textContent = siteData.blog;
  }

  // Populate social links
  const socialsContainer = document.getElementById('socials-links');
  if (socialsContainer) {
    const socialLinks = [
      { name: 'WhatsApp', link: siteData.whatsapp, display: siteData.phone },
      { name: 'Instagram', link: siteData.instagram, display: '@' + siteData.instagram.replace(/^https?:\/\//, '').split('/').pop() },
      { name: 'Email', link: 'mailto:' + siteData.email, display: siteData.email },
      { name: 'Blog', link: siteData.blog, display: 'Blog' }
    ];
    socialLinks.forEach(s => {
      const a = document.createElement('a');
      a.className = 'social-link';
      a.href = s.link;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = `
        <strong>${s.name}</strong>
        <span>${s.display}</span>
      `;
      socialsContainer.appendChild(a);
    });
  }

  // Update current year in the footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    const currentYear = new Date().getFullYear();
    yearEl.textContent = currentYear;
  }
});

// Handle contact form submission
function handleContact(e) {
  e.preventDefault();
  const dataEl = document.getElementById('site-data');
  const siteData = JSON.parse(dataEl.textContent);
  const name = encodeURIComponent(document.getElementById('name').value || 'Visitor');
  const body = encodeURIComponent(document.getElementById('msg').value || 'Hello, I saw your portfolio and...');
  const subject = encodeURIComponent('New contact from ' + name);
  window.location.href = 'mailto:' + siteData.email + '?subject=' + subject + '&body=' + body;
}