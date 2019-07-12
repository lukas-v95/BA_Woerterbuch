export class URIHelper {
    public static getBaseUrl(): string {
        if (window.location.href.startsWith('https://angular-woerterbuch.herokuapp.com')) {
          return 'https://java-server-woerterbuch.herokuapp.com/';
        } else {
          return 'http://localhost:8080/';
        }
      }
}