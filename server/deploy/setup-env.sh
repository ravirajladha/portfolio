#!/usr/bin/env bash
# Run once on the server. Writes /etc/portfolio/portfolio.env without printing any secret.
# Superseded for the database part by setup-db.sh, which creates a dedicated `portfolio` database.
set -euo pipefail
SRC=/var/www/thesecrethaircare-v2-api/.env
get() { sudo grep -E "^$1=" "$SRC" | head -1 | cut -d= -f2- | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'\$//"; }
enc() { python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1],safe=""))' "$1"; }
URL="mysql+pymysql://$(enc "$(get DB_USERNAME)"):$(enc "$(get DB_PASSWORD)")@$(get DB_HOST):$(get DB_PORT)/$(get DB_DATABASE)?charset=utf8mb4"
sudo mkdir -p /etc/portfolio
if sudo test -f /etc/portfolio/portfolio.env; then echo "env file already exists, leaving it"; exit 0; fi
printf 'DATABASE_URL=%s\nADMIN_KEY=%s\nHASH_SALT=%s\n' "$URL" "$(openssl rand -hex 24)" "$(openssl rand -hex 24)" | sudo tee /etc/portfolio/portfolio.env >/dev/null
sudo chown root:ubuntu /etc/portfolio/portfolio.env && sudo chmod 640 /etc/portfolio/portfolio.env
echo "wrote /etc/portfolio/portfolio.env"
