let APIURL= '';
switch(window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'pr-brewpub-client.herokuapp.com':
        APIURL = 'https://pr-brewpub.herokuapp.com';
        break;
    default:
        break;
}

export default APIURL;