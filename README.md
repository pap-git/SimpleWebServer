# SimpleWebServer
## What is this?

SimpleWebServer is a very simple web server built with Node.js and Express.js.
It is intended to use for testing your static site, not meant to be use in production.

## Usage

Basically, clone the repo, cd, install the express, and that's all.
```bash
git clone https://github.com/pap-git/SimpleWebServer && cd SimpleWebServer && npm i
```

## Settings

There's `config.json` by default. if you deleted accidentally, here's the template
```
{
    "port": 3000,
    "rootfolder": "\\root",
    "autoRedirectHTML": true,
    "console": {
        "in": false,
        "out": true,
        "err": true
    }
}
```

alright im lazy to explain this, just try and error pls

## License

mit see the LICENSE file