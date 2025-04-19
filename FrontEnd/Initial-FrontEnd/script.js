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
  