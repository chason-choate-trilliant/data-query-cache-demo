# FE Data Query Cache Test

## Setup

```
sudo vim /etc/hosts

127.0.0.1       home.cachetest.io
127.0.0.1       api.eng.cachetest.io
```

```bash
brew install mkcert
mkcert -install
```

## Run

```bash
cd certs
mkcert '*.cachetest.io'
mkcert 'api.eng.cachetest.io'
cd ..
docker compose up
```

NOTE: It'll take 10+ seconds to start up on first run due to installing deps. but then restarts should be very fast.

Visit https://home.cachetest.io to see the UI
