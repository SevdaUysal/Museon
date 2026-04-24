<?php session_start(); ?>

<!DOCTYPE HTML>
<html>
<head>
    <title>Museon</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="assets1/css/main.css" />
    <noscript><link rel="stylesheet" href="assets1/css/noscript.css" /></noscript>
    <style>
    /* Your existing styles + popup */
    .thumb { transition: all 0.5s ease !important; }
    .thumb.show { display: block !important; visibility: visible !important; opacity: 1 !important; }
    .thumb:not(.show) { display: none !important; visibility: hidden !important; opacity: 0 !important; }
    
    .popup {
        position: fixed; top: 20px; right: 20px;
        background: #28a745; color: white;
        padding: 15px 25px; border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999; transform: translateX(400px);
        transition: all 0.3s ease; font-family: Arial;
    }
    .popup.show { transform: translateX(0); }
    .popup.error { background: #dc3545; }
    </style>
</head>
<body class="is-preload">
    <!-- POPUP - MOVED TO BODY -->
    <div id="success-popup" class="popup" style="display:none;">
        ✅ Thank you! Your message has been sent successfully.
    </div>

    <!-- Wrapper -->
    <div id="wrapper">
        <!-- Header -->
        <header id="header">
            <div class="inner">
                <a href="index.php" class="logo">
                    <span class="symbol"><img src="assets1/images/logo.png" alt="" /></span>
                    <span class="title">Museon</span>
                </a>
                <nav><ul><li><a href="#menu">Menu</a></li></ul></nav>
            </div>
        </header>

        <!-- Menu -->
        <nav id="menu">
            <h2>Menu</h2>
            <ul>
                <?php if (isset($_SESSION['user_id'])): ?>
                    <li>Welcome, <?= $_SESSION['username']; ?></li>
                    <li><a href="index.php">Home</a></li>
                    <li><a href="logout.php">Logout</a></li>
                <?php else: ?>
                    <li><a href="index.php">Home</a></li>
                    <li><a href="login.php">Login</a></li>
                <?php endif; ?>
                <li><a href="favorites.html">Favorites</a></li>
                <li><a href="About.html">About</a></li>
            </ul>
        </nav>
        
        <!-- Main -->
        <div id="main">
            <div class="inner">
                <header>
                    <h1>Museon — Where Art Meets Experience</h1>
                    <h2>Discover curated masterpieces<br>Explore a new generation of independent artists<br>All in one place</h2>
                </header>
                <section class="tiles">
                    <article class="style1">
                        <span class="image"><img src="assets1/images/pic01.jpg" alt="" /></span>
                        <a href="index2.html?category=abstract">
                            <h2>Abstract</h2><div class="content"><p>Shapes & Color</p></div>
                        </a>
                    </article>
                    <article class="style2">
                        <span class="image"><img src="assets1/images/pic02.jpg" alt="" /></span>
                        <a href="index2.html?category=landscape art">
                            <h2>Landscape</h2><div class="content"><p>Nature Scenes</p></div>
                        </a>
                    </article>
                    <article class="style4">
                        <span class="image"><img src="assets1/images/pic04.jpg" alt="" /></span>
                        <a href="index2.html?category=portrait art">
                            <h2>Portrait</h2><div class="content"><p>Human Figures</p></div>
                        </a>
                    </article>
                    <article class="style5">
                        <span class="image"><img src="assets1/images/pic05.jpg" alt="" /></span>
                        <a href="index2.html?category=surreal art">
                            <h2>Surreal</h2><div class="content"><p>Dreamlike Imagery</p></div>
                        </a>
                    </article>
                    <article class="style6">
                        <span class="image"><img src="assets1/images/pic06.jpg" alt="" /></span>
                        <a href="index2.html?category=old and traditional drawings">
                            <h2>Classical</h2><div class="content"><p>Traditional Art</p></div>
                        </a>
                    </article>
                    <article class="style3">
                        <span class="image"><img src="assets1/images/pic03.jpg" alt="" /></span>
                        <a href="index2.html?category=sculpture">
                            <h2>Sculpture</h2><div class="content"><p>Three-Dimensional Art</p></div>
                        </a>
                    </article>
                </section>
            </div>
        </div>

        <!-- Footer - FORM FIXED -->
        <footer id="footer">
            <div class="inner">
                <section>
                    <h2>Get in touch</h2>
                    <form method="post" action="contact.php"> <!-- ✅ FIXED: Added action -->
                        <div class="fields">
                            <div class="field half">
                                <input type="text" name="name" id="name" placeholder="Name" required />
                            </div>
                            <div class="field half">
                                <input type="email" name="email" id="email" placeholder="Email" required />
                            </div>
                            <div class="field">
                                <textarea name="message" id="message" placeholder="Message" required></textarea>
                            </div>
                        </div>
                        <ul class="actions">
                            <li><input type="submit" value="Send" class="primary" /></li>
                        </ul>
                    </form>
                </section>
                <section>
					<h2>Follow</h2>
					<ul class="icons">
						<li><a href="https://twitter.com" class="icon brands style2 fa-twitter" target="_blank"><span class="label">Twitter</span></a></li>
						<li><a href="https://facebook.com" class="icon brands style2 fa-facebook-f" target="_blank"><span class="label">Facebook</span></a></li>
						<li><a href="https://instagram.com" class="icon brands style2 fa-instagram" target="_blank"><span class="label">Instagram</span></a></li>
						<li><a href="https://dribbble.com" class="icon brands style2 fa-dribbble" target="_blank"><span class="label">Dribbble</span></a></li>
						<li><a href="https://github.com" class="icon brands style2 fa-github" target="_blank"><span class="label">GitHub</span></a></li>
						<li><a href="https://500px.com" class="icon brands style2 fa-500px" target="_blank"><span class="label">500px</span></a></li>
						<li><a href="tel:+1234567890" class="icon solid style2 fa-phone" target="_blank"><span class="label">Phone</span></a></li>
						<li><a href="mailto:sevdauysal1370@gmail.com" class="icon solid style2 fa-envelope" target="_blank"><span class="label">Email</span></a></li>
					</ul>
				</section>
            </div>
        </footer>
    </div>

    <!-- POPUP SCRIPT - FIXED -->
    <script>
    window.addEventListener('load', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const popup = document.getElementById('success-popup');
        
        if (urlParams.get('success')) {
            popup.style.display = 'block';
            popup.classList.add('show');
            
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Auto-hide
            setTimeout(() => {
                popup.classList.remove('show');
                setTimeout(() => popup.style.display = 'none', 300);
            }, 4000);
        }
    });
    </script>

    <!-- Scripts -->
    <script src="assets1/js/jquery.min.js"></script>
    <script src="assets1/js/browser.min.js"></script>
    <script src="assets1/js/breakpoints.min.js"></script>
    <script src="assets1/js/util.js"></script>
    <script src="assets1/js/main.js"></script>
</body>
</html>