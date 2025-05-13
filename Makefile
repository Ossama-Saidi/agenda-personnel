PROJECT_NAME=agenda_personnel
FRONT_CONTAINER=agenda_frontend
BACK_CONTAINER=agenda_backend

up:
	docker-compose up -d

build:
	docker-compose up -d --build

rebuild:
	docker-compose build --no-cache && docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose down && docker-compose up -d

enter-back:
	docker exec -it $(BACK_CONTAINER) sh

enter-front:
	docker exec -it $(FRONT_CONTAINER) sh

logs:
	docker-compose logs -f

clean:
	docker-compose down -v --remove-orphans