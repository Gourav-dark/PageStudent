import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { SessionTokenManagerService } from '../services/session-token-manager.service';
export const authGuard: CanActivateFn = (route, state) => {
  const sessionToken=inject(SessionTokenManagerService);
  if (sessionToken.getToken()) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['login']);
  }
};
