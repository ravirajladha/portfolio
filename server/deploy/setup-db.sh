#!/usr/bin/env bash
# Run once on the server. Creates a dedicated MySQL database and user for the portfolio
# and points /etc/portfolio/portfolio.env at it. Prints no secrets.
set -euo pipefail
DB=portfolio; USER=portfolio; ENV=/etc/portfolio/portfolio.env
PASS=$(openssl rand -hex 20)
sudo mysql <<SQL
CREATE DATABASE IF NOT EXISTS \`$DB\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$USER'@'localhost' IDENTIFIED BY '$PASS';
ALTER USER '$USER'@'localhost' IDENTIFIED BY '$PASS';
GRANT ALL PRIVILEGES ON \`$DB\`.* TO '$USER'@'localhost';
FLUSH PRIVILEGES;
SQL
sudo cp "$ENV" "$ENV.bak-$(date +%Y%m%d-%H%M%S)"
sudo sed -i "s|^DATABASE_URL=.*|DATABASE_URL=mysql+pymysql://$USER:$PASS@127.0.0.1:3306/$DB?charset=utf8mb4|" "$ENV"
echo "database '$DB' and user '$USER' ready; env updated"
