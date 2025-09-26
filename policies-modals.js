// Centralized modal logic for Quality & Shipping Policies
(function(){
  const MODALS = [
    {
      overlayId: 'qualityPoliciesOverlay',
      triggerSelectors: [
        '#qualityPoliciesBtn',
        '#qualityPoliciesBtnBottom',
        '#qualityPoliciesBtnMobile'
      ]
    },
    {
      overlayId: 'shippingPoliciesOverlay',
      triggerSelectors: [
        '#shippingPoliciesBtn',
        '#shippingPoliciesBtnBottom',
        '#shippingPoliciesBtnMobile'
      ]
    }
  ];

  function initModal(def){
    const overlay = document.getElementById(def.overlayId);
    if(!overlay) return; // Overlay not in this page
    const modal = overlay.querySelector('.qp-modal');
    const closeButtons = overlay.querySelectorAll('.qp-close,[data-close-qp],[data-close-sp]');
    let lastFocused = null;

    function trapFocus(e){
      if(!overlay.classList.contains('active')) return;
      if(e.key === 'Tab'){
        const focusables = Array.from(overlay.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])'))
          .filter(el=>!el.disabled && el.offsetParent !== null);
        if(!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      } else if(e.key === 'Escape'){
        close();
      }
    }

    function open(){
      if(overlay.classList.contains('active')) return;
      lastFocused = document.activeElement;
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      setTimeout(()=>{ modal.querySelector('.qp-close')?.focus(); }, 40);
      document.addEventListener('keydown', trapFocus);
    }
    function close(){
      if(!overlay.classList.contains('active')) return;
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', trapFocus);
      if(lastFocused && lastFocused.focus) setTimeout(()=> lastFocused.focus(), 50);
    }

    // Backdrop click
    overlay.addEventListener('click', e=>{
      if(e.target.classList.contains('qp-backdrop')) close();
    });

    // Close buttons
    closeButtons.forEach(btn=> btn.addEventListener('click', e=>{ e.preventDefault(); close(); }));

    // Triggers
    def.triggerSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.addEventListener('click', e=>{ e.preventDefault(); open(); });
      });
    });

    // Expose optional API
    window.openPolicyModal = function(id){ if(id === def.overlayId) open(); };
    window.closePolicyModal = function(id){ if(id === def.overlayId) close(); };
  }

  function initAll(){ MODALS.forEach(initModal); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll, {once:true}); else initAll();
})();
