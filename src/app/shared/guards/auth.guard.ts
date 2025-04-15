import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Get the role from localStorage

  if (!token) {
    // If no token, redirect to the login page
    router.navigate(['/about']);
    return false;
  }

  // Check if the user is a merchant or representative and is trying to access restricted routes
  const restrictedRoutes = [
    'branches',
    'governorates',
    'cities',
    'weights',
    'order-report',
  ];
  const isRestrictedRoute = restrictedRoutes.some((routePath) =>
    state.url.includes(routePath)
  );

  if ((role === 'Merchant' || role === 'Representative') && isRestrictedRoute) {
    // If user is a merchant or representative and trying to access restricted routes
    router.navigate(['/home']); // Or any other page you want to redirect them to
    return false;
  }

  return true;
};
