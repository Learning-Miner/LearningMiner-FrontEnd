import { HttpErrorResponse } from '@angular/common/http';

import { _throw as throwError } from 'rxjs/observable/throw';

export function handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    alert('An error occurred:' + error.error.message);
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    const errorDescription = `Backend returned code ${error.status}, ` +
      `body was: ${JSON.stringify(error.error)}`;

    console.error(errorDescription);
    alert(errorDescription);
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
}