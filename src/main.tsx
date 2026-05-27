import { Outlet, RouterProvider, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';
import { siteContent } from './site-content';

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

    return () => {
      menuToggle?.removeEventListener('click', toggleMenu);
      window.removeEventListener('resize', closeMenuOnDesktop);
      mobileNavLinks.forEach((link) => {
        link.removeEventListener('click', closeMenu);
      });
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
