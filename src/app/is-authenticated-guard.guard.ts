import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth-service.service';
import { map } from 'rxjs';

export const isAuthenticatedGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authService = inject(AuthService);
  return authService.isLoggedIn().pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      } else {
        return router.createUrlTree(['/auth/login'], {
          queryParams: { returnUrl: state.url },
        });
      }
    }),
  );
};
