module.exports = {
    "extends": "eslint:recommended",
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "linebreak-style": ["error", "windows"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        // override default options for rules from base configurations
        "no-cond-assign": ["off", "always"],
        // disable rules from base configurations
        "no-console": "off",
    },
    'env':{
        browser: true
    },
    root: true,
    gloabals: {
        '_': false,
        'Builder': true,
        'Point': true,
        'toRad': false
    },
     parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
    }
}