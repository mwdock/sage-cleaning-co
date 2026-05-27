import { Outlet, RouterProvider, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';
import { siteContent } from './site-content';

const leadFormEndpoint = 'https://leads.lumetech.ca/v1/forms/blue-sage-contact/submit';

function HomePage() {
  useEffect(() => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');

    const closeMenu = () => {
      mobileMenu?.classList.add('hidden');
      openIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    };

    const toggleMenu = () => {
      if (!mobileMenu || !openIcon || !closeIcon) return;

      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        closeMenu();
      } else {
        mobileMenu.classList.remove('hidden');
        openIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    };

    const closeMenuOnDesktop = () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };

    menuToggle?.addEventListener('click', toggleMenu);
    window.addEventListener('resize', closeMenuOnDesktop);

    const mobileNavLinks = Array.from(document.querySelectorAll('.mobile-nav-link'));
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('stagger-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    document.querySelectorAll('.grid.md\\:grid-cols-2 .service-card').forEach((el) => {
      observer.observe(el);
    });

    document.querySelectorAll('.grid.md\\:grid-cols-3 .testimonial-card').forEach((el) => {
      observer.observe(el);
    });

    const leadForm = document.getElementById('lead-form') as HTMLFormElement | null;
    const leadFormStatus = document.getElementById('lead-form-status');
    const leadFormButton = leadForm?.querySelector('button[type="submit"]') as HTMLButtonElement | null;

    const setLeadFormStatus = (message: string, isError = false) => {
      if (!leadFormStatus) return;
      leadFormStatus.textContent = message;
      leadFormStatus.classList.remove('text-red-600', 'text-earth-400', 'text-sage-700');
      if (isError) {
        leadFormStatus.classList.add('text-red-600');
      } else if (message.startsWith('Thanks')) {
        leadFormStatus.classList.add('text-sage-700');
      } else {
        leadFormStatus.classList.add('text-earth-400');
      }
    };

    const submitLeadForm = async (event: SubmitEvent) => {
      event.preventDefault();
      if (!leadForm) return;

      const formData = new FormData(leadForm);
      const optionalField = (key: string) => {
        const value = String(formData.get(key) || '').trim();
        return value ? value : undefined;
      };

      const payload = {
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        phone: optionalField('phone'),
        purpose: optionalField('service-type'),
        message: optionalField('message'),
        website: String(formData.get('website') || ''),
        page_url: window.location.href,
        metadata: {
          service_type: String(formData.get('service-type') || ''),
          source: 'blue-sage-cleaning-website',
        },
      };

      leadFormButton?.setAttribute('disabled', 'true');
      leadFormButton?.classList.add('opacity-70', 'cursor-wait');
      setLeadFormStatus('Sending your message...');

      try {
        const response = await fetch(leadFormEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Lead notifier returned ${response.status}`);
        }

        leadForm.reset();
        setLeadFormStatus("Thanks, Zoe will be in touch soon!");
      } catch (error) {
        console.error('Lead form submission failed', error);
        setLeadFormStatus(
          'Something went wrong sending the form. Please email zoe@bluesagecleaning.ca directly.',
          true,
        );
      } finally {
        leadFormButton?.removeAttribute('disabled');
        leadFormButton?.classList.remove('opacity-70', 'cursor-wait');
      }
    };

    leadForm?.addEventListener('submit', submitLeadForm);

    return () => {
      menuToggle?.removeEventListener('click', toggleMenu);
      window.removeEventListener('resize', closeMenuOnDesktop);
      mobileNavLinks.forEach((link) => {
        link.removeEventListener('click', closeMenu);
      });
      leadForm?.removeEventListener('submit', submitLeadForm);
      observer.disconnect();
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: siteContent }} />;
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(<RouterProvider router={router} />);
