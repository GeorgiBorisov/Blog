module.exports = {
    hashSecret: 'nd&u=op0-01ho{wne27kfyn3(85y4jb64_55n[65njk%7k6j+nj9rejg49g*913vhh',
    sessionSecret: '92hr%n6739&6q548e22*grqwffq[fq2]',
    mailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passRegex: /[a-z0-9]{8,}/i,
    userRegex: /[a-z0-9]/i,
    sessionOptions: {
        key: 'session_cookie_name',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'blog',
        clearExpired: true,
        checkExpirationInterval: 100000000,
        expiration: 100000000,
        endConnectionOnClose: true
    }
}