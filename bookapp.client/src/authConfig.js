import { LogLevel } from "@azure/msal-browser";


export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_signupsignin1',
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://bookappstore.b2clogin.com/bookappstore.onmicrosoft.com/B2C_1_signupsignin1',
        },
    },
    authorityDomain: 'bookappstore.b2clogin.com',
};

export const msalConfig = {
    auth: {
        clientId: 'bccee812-4295-46cc-afaa-d5df51b07943',
        authority: b2cPolicies.authorities.signUpSignIn.authority, 
        knownAuthorities: [b2cPolicies.authorityDomain], 
        redirectUri: 'http://localhost:5173', 
    },
    cache: {
        cacheLocation: 'sessionStorage', 
        storeAuthStateInCookie: false, 
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};


export const protectedResources = {
    apibooks: {
        endpoint: 'https://localhost:7086/api/books',
        scopes: {
            read: ['https://bookappstore.onmicrosoft.com/books-api/books.read'],
            write: ['https://bookappstore.onmicrosoft.com/books-api/books.write'],
        },
    },
};


export const loginRequest = {
    scopes: [...protectedResources.apibooks.scopes.read, ...protectedResources.apibooks.scopes.write],
};
