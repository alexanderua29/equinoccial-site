  (function(){
    var hamburger = document.getElementById('hamburgerBtn');
    var mobileNav = document.getElementById('mobileNav');
    var backdrop = document.getElementById('mobileNavBackdrop');

    function closeMenu(){
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false');
      mobileNav.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow='';
    }
    function openMenu(){
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded','true');
      mobileNav.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow='hidden';
    }
    hamburger.addEventListener('click', function(){
      if(mobileNav.classList.contains('open')){ closeMenu(); } else { openMenu(); }
    });
    backdrop.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked
    mobileNav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', closeMenu);
    });

    // Mobile "Servicios" accordion
    var ddToggle = mobileNav.querySelector('.mobile-dropdown-toggle');
    var dd = mobileNav.querySelector('.mobile-dropdown');
    ddToggle.addEventListener('click', function(){
      var isOpen = dd.classList.toggle('open');
      ddToggle.classList.toggle('open', isOpen);
      ddToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', function(){
      if(window.innerWidth > 900){ closeMenu(); }
    });
  })();
