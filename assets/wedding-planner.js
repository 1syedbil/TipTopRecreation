(function () {
  'use strict';

  /**
   * Initialize modal handling for one wedding planner section.
   * @param {Element} root
   */
  function init(root) {
    const modals = /** @type {NodeListOf<HTMLElement>} */ (
      root.querySelectorAll('.wp-modal')
    );
    const openTriggers = /** @type {NodeListOf<HTMLElement>} */ (
      root.querySelectorAll('[data-modal-open]')
    );

    /** @type {HTMLElement | null} */
    let lastFocused = null;

    /**
     * @param {string | null} id
     */
    const openModal = (id) => {
      if (!id) return;
      const modal = /** @type {HTMLElement | null} */ (
        root.querySelector(`.wp-modal[data-modal="${id}"]`)
      );
      if (!modal) return;

      lastFocused = /** @type {HTMLElement | null} */ (document.activeElement);
      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';

      const firstInput = /** @type {HTMLElement | null} */ (
        modal.querySelector(
          'input, select, textarea, button:not([data-modal-close])'
        )
      );
      if (firstInput) {
        window.setTimeout(() => firstInput.focus(), 80);
      }
    };

    /**
     * @param {HTMLElement | null} modal
     */
    const closeModal = (modal) => {
      if (!modal) return;
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    };

    const closeAllModals = () => {
      modals.forEach((m) => closeModal(m));
    };

    openTriggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        openModal(btn.getAttribute('data-modal-open'));
      });
    });

    modals.forEach((modal) => {
      modal.querySelectorAll('[data-modal-close]').forEach((el) => {
        el.addEventListener('click', () => closeModal(modal));
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });
  }

  const boot = () => {
    document.querySelectorAll('.wp-section').forEach((el) => init(el));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();