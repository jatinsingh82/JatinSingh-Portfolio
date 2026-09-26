/**
 * Jatin Singh — Resume Print Engine
 * Handles print / PDF triggering cleanly without inline event handlers for CSP compliance.
 */
document.addEventListener('DOMContentLoaded', () => {
  const printBtn = document.getElementById('btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
});
