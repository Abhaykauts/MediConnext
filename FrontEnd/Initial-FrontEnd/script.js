// Intersection Observer to add 'visible' class when the feature section enters the viewport
document.addEventListener('DOMContentLoaded', function() {
    const features = document.querySelector('.features');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible
  
    observer.observe(features);
  });
  document.getElementById("newsletterForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const subscribe = document.getElementById("subscribeCheckbox").checked;
  
    console.log("Submitted Email:", email);
    console.log("Subscribe to Newsletter:", subscribe);
  
    alert("Thank you for subscribing!");
  });
  

  let current = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  
  function showSlide(index) {
      testimonials.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
          dots[i].classList.toggle('active', i === index);
      });
      current = index;
  }
  
  dots.forEach((dot, i) => {
      dot.addEventListener('click', () => showSlide(i));
  });
  
  setInterval(() => {
      const next = (current + 1) % testimonials.length;
      showSlide(next);
  }, 4000);
  
  
// login/signup 

const authBtn = document.getElementById('authBtn');
const authModal = document.getElementById('authModal');
const closeBtn = document.querySelector('.close-btn');
const toggleMode = document.getElementById('toggleMode');

let isLogin = true;

authBtn.onclick = () => {
  authModal.style.display = 'flex';
};

closeBtn.onclick = () => {
  authModal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target == authModal) {
    authModal.style.display = 'none';
  }
};

toggleMode.onclick = () => {
  isLogin = !isLogin;
  toggleMode.textContent = isLogin ? 'Sign Up' : 'Log In';
};
