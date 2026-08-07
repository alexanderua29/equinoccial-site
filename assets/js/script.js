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
// Envío del formulario de cotización: Web3Forms + WhatsApp
(function(){
  var form = document.getElementById('quote-form');
  if(!form) return;
  var statusMsg = document.getElementById('quote-form-status');
  var WHATSAPP_NUMBER = "593988145824"; // <-- reemplaza con tu número, código de país sin +, sin espacios

  form.addEventListener('submit', function(e){
    e.preventDefault();

    var formData = new FormData(form);
    var nombre = formData.get('name') || '';
    var empresa = formData.get('company') || '';
    var telefono = formData.get('phone') || '';
    var email = formData.get('email') || '';
    var sector = formData.get('sector') || '';
    var servicio = formData.get('service') || '';
    var mensaje = formData.get('message') || '';

    statusMsg.style.display = 'block';
    statusMsg.style.color = 'var(--light-gray)';
    statusMsg.textContent = 'Enviando solicitud...';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
      if(data.success){
        statusMsg.style.color = 'var(--gold)';
        statusMsg.textContent = '¡Solicitud enviada! Te contactaremos pronto.';
        form.reset();

        var texto = "Hola, quiero solicitar una cotización:%0A" +
          "Nombre: " + nombre + "%0A" +
          "Empresa: " + empresa + "%0A" +
          "Teléfono: " + telefono + "%0A" +
          "Correo: " + email + "%0A" +
          "Sector: " + sector + "%0A" +
          "Servicio: " + servicio + "%0A" +
          "Detalle: " + mensaje;

        window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + texto, "_blank");
      } else {
        statusMsg.style.color = '#e74c3c';
        statusMsg.textContent = 'Hubo un error al enviar. Intenta de nuevo o contáctanos por WhatsApp.';
      }
    })
    .catch(function(){
      statusMsg.style.color = '#e74c3c';
      statusMsg.textContent = 'Hubo un error al enviar. Intenta de nuevo o contáctanos por WhatsApp.';
    });
  });
})();