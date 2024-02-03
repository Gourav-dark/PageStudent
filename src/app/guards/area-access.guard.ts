import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionTokenManagerService } from '../services/session-token-manager.service';

export const areaAccessGuard: CanActivateFn = (route, state) => {
  const sessionToken=inject(SessionTokenManagerService);
  if (sessionToken.JwtTokenData().roleName!=="Student") {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['home']);
  }
};
