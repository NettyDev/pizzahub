# PizzaHub - Projekt PSI

Projekt stworzony na przedmiot `Projektowanie stron internetowych`.

## Wymagania systemowe

- **Bun** (najnowsza wersja) - [Instrukcja instalacji](https://bun.sh/)
- **Docker** lub **Podman** z Docker Compose
- **Git**

## Instalacja

1. Sklonuj repozytorium:

```bash
git clone <url-repozytorium>
cd pizzahub
```

2. Zainstaluj zależności:

```bash
bun install
```

3. Skonfiguruj zmienne środowiskowe:

```bash
cp dev.env .env
# Plik jest używany tylko i wyłącznie do trybu deweloperskiego.
# Zawiera on już poprawne dane testowe.
```

## Uruchamianie projektu

### Tryb deweloperski

1. Uruchom docker-compose.dev.yml

```bash
sudo docker compose -f docker-compose.dev.yml up -d
```

Można skorzystać z profilu `ai` jeżeli chcemy skorzystać z `Pizzi`.

```bash
sudo docker compose -f docker-compose.dev.yml --profile ai up -d
```

2. Uruchom skrypt entrypoint.ts

```bash
bun entrypoint.ts
```

Skrypt powinien odczytać zmienne z pliku `.env` i na jej podstawie połączyć się z bazą danych, zainicjować jej strukturę oraz wstawić przykładowe dane. Jeżeli użyto profilu `ai` pobierze on również LLM (domyślnie gemma3:1b, ~900MB).

3. Uruchamiamy generacje biblioteki `prisma`

```bash
bun generate
```

4. Uruchamiamy serwer w trybie deweloperskim

```bash
bun dev
```

#### Porty

- **3000** - główna aplikacji
- **11025** - serwer SMTP `maildev`
- **11080** - interfejs `maildev` (dostęp do mail'i)
- **11434** - API `Ollama` (ai)
- **18080** - `adminer`
- **15433** - `pgadmin4`
- **15432** - baza danych `postgres`

### Tryb produkcyjny

Można uruchomić projekt w trybie produkcyjnym na dwa sposoby. Pierwszy to zbudowanie obrazu osobno i uruchomienie `docker compose` z profilem `ready` osobno. Drugi to uruchomienie `docker compose` z profilem `build` który od razu zbuduje obraz i go uruchomi.

#### Sposób pierwszy

1. Uruchamianie budowania obrazu

```bash
sudo docker build -t next .
```

2. Uruchamianie `docker-compose.yml` z profilem `ready`

```bash
sudo docker compose --profile ready up -d
# Włączenie AI
sudo docker compose --profile ready --profile ai up -d
```

3. Gotowe. Aplikacja powinna być dostępna pod adresem `http://localhost:3000`

#### Sposób drugi

1. Uruchamianie `docker-compose.yml` z profilem `build`

```bash
sudo docker compose --profile build up -d
# Włączenie AI
sudo docker compose --profile build --profile ai up -d
```

Uruchomienie może zająć nieco dłużej ponieważ podczas stawiania `docker compose` jest również budowany obraz.

2. Gotowe. Aplikacja powinna być dostępna pod adresem `http://localhost:3000`

#### Uwaga dotycząca profilu `ai`

Jeżeli korzystamy z profilu `ai` to uruchomienie aplikacji może zająć dłużej za pierwszym razem gdyż będzie pobierany LLM.

#### Porty

- **3000** - główna aplikacji
- **11080** - interfejs `maildev` (dostęp do mail'i)
- **18080** - `adminer`

## Struktura projektu

```
├── src/                   # Kod źródłowy aplikacji
├── prisma/                # Schemat bazy danych
├── emails/                # Szablony emaili
├── public/                # Zasoby statyczne
├── sql/                   # Dane testowe
├── docker-compose.yml     # Konfiguracja produkcyjna
├── docker-compose.dev.yml # Konfiguracja deweloperska
└── entrypoint.ts          # Skrypt inicjalizacyjny
```

## Dane testowe

### Baza danych

Login: `postgres`
Hasło: `password`
Baza danych: `next`

### Użytkownicy

| Login/Email             | Hasło    | Rola  |
| ----------------------- | -------- | ----- |
| g.szwyngiel@pizzahub.pl | password | admin |
| n.zatorska@pizzahub.pl  | password | admin |
| mail@example.com        | password | user  |
