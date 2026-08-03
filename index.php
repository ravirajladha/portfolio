<?php
$status = $_GET['status'] ?? '';
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Portfolio of Ravi Raj Ladha — Full-stack Software Developer and AI/ML engineer in progress.">
  <title>Ravi Raj Ladha | Full-stack Developer</title>
  <link rel="stylesheet" href="assets/style.css">
  <script defer src="assets/script.js"></script>
</head>
<body>
  <header class="site-header">
    <a class="logo" href="#home" aria-label="Ravi Raj Ladha home">RRL<span>.</span></a>
    <button class="menu" aria-label="Open navigation" aria-expanded="false">Menu</button>
    <nav aria-label="Main navigation">
      <a href="#about">About</a><a href="#experience">Experience</a><a href="#skills">Skills</a><a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section class="hero" id="home">
      <div>
        <p class="eyebrow">Full-stack developer · AI/ML engineer in progress</p>
        <h1>I build reliable software for real-world problems.</h1>
        <p class="lead">I'm Ravi Raj Ladha, a software developer with 4+ years of experience delivering production web applications across automotive, healthcare, e-commerce, and enterprise sectors.</p>
        <div class="actions"><a class="button primary" href="#contact">Let’s talk</a><a class="button" href="Resume1.pdf" target="_blank">View résumé</a></div>
      </div>
      <aside class="hero-card" aria-label="Highlights">
        <span>Based in Bangalore, India</span>
        <strong>4+ years</strong><small>Professional experience</small>
        <strong>13</strong><small>Real-time applications architected</small>
        <strong>10,000+</strong><small>Monthly users served</small>
      </aside>
    </section>

    <section id="about" class="section split">
      <div><p class="eyebrow">About me</p><h2>Engineering today, intelligent systems tomorrow.</h2></div>
      <div><p>I specialize in scalable backend systems, REST APIs, third-party integrations, and polished full-stack experiences. Alongside my professional work, I’m pursuing an M.Tech in Artificial Intelligence & Machine Learning from BITS Pilani.</p><p>My current focus includes machine learning, agentic AI with LangChain and Ollama, LLM integrations, and data-driven application development.</p></div>
    </section>

    <section id="experience" class="section">
      <p class="eyebrow">Experience</p><h2>Where I’ve made an impact.</h2>
      <div class="timeline">
        <article><div class="meta"><span>Jul 2025 — Present</span><span>Bangalore</span></div><h3>Full-stack Software Developer</h3><h4>Mahindra First Choice Wheels Limited</h4><p>Own end-to-end development of the Preinspection module, delivering features and L2/L3 support for business-critical used-vehicle inspection workflows.</p><ul><li>Build and optimize CodeIgniter and MySQL REST APIs through query, index, and payload tuning.</li><li>Ship secure integrations, production hotfixes, and controlled releases with minimal downtime.</li><li>Automate QA and operational workflows using Playwright and Microsoft Power Automate.</li></ul></article>
        <article><div class="meta"><span>Mar 2022 — Apr 2025</span><span>Bangalore</span></div><h3>Software Developer</h3><h4>KODS Technologies Private Limited</h4><p>Architected 13 real-time applications and integrated services including WhatsApp, SendGrid, and Razorpay for products serving 10,000+ monthly users.</p><ul><li>Designed scalable platforms across healthcare, e-commerce, and enterprise use cases.</li><li>Deployed to AWS and private servers using GitHub CI/CD pipelines.</li><li>Improved reliability for systems processing more than 6,000 monthly transactions.</li></ul></article>
      </div>
    </section>

    <section id="skills" class="section">
      <p class="eyebrow">Technical toolkit</p><h2>Built across the stack.</h2>
      <div class="skill-grid">
        <article><h3>AI & Data</h3><p>Python, NumPy, Pandas, Scikit-learn, Jupyter, LangChain, Ollama, LLM APIs, prompt engineering</p></article>
        <article><h3>Backend</h3><p>PHP, Laravel, Node.js, Express, Django, CodeIgniter, REST APIs</p></article>
        <article><h3>Frontend</h3><p>JavaScript, TypeScript, React, Redux, Livewire, Tailwind CSS, Bootstrap, HTML & CSS</p></article>
        <article><h3>Data & Infrastructure</h3><p>MySQL, MongoDB, Prisma, AWS, DigitalOcean, Docker, Apache, Nginx, GitHub CI/CD</p></article>
      </div>
    </section>

    <section class="section education">
      <p class="eyebrow">Education</p><div><h2>M.Tech in Artificial Intelligence & Machine Learning</h2><p>BITS Pilani · Work Integrated Learning Programme · 2025–2027 (Pursuing)</p><p class="muted">Machine Learning, Deep Neural Networks, Data Engineering, MLOps, and Statistical Methods for Data Science.</p></div>
    </section>

    <section id="contact" class="section contact">
      <div><p class="eyebrow">Get in touch</p><h2>Have a project or opportunity in mind?</h2><p>Send me a note and I’ll get back to you at the email address you provide.</p><a href="mailto:ravirajladha@gmail.com">ravirajladha@gmail.com</a><a href="tel:+918986000099">+91 89860 00099</a></div>
      <form action="send-contact.php" method="post">
        <?php if ($status === 'sent'): ?><p class="notice success" role="status">Thanks — your message has been sent.</p><?php endif; ?>
        <?php if ($status === 'error'): ?><p class="notice error" role="alert">The message could not be sent. Please email me directly.</p><?php endif; ?>
        <div class="field-row"><label>Name<input name="name" required maxlength="80" autocomplete="name"></label><label>Email<input type="email" name="email" required maxlength="120" autocomplete="email"></label></div>
        <label>Subject<input name="subject" required maxlength="120"></label>
        <label>Message<textarea name="message" rows="6" required maxlength="3000"></textarea></label>
        <label class="trap" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <button class="button primary" type="submit">Send message</button>
      </form>
    </section>
  </main>
  <footer><span>© <?= date('Y') ?> Ravi Raj Ladha</span><a href="#home">Back to top ↑</a></footer>
</body>
</html>
