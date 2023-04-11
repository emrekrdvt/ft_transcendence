# Colors
RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[0;33m
BLUE=\033[0;34m

build: database frontend backend

database:
	@echo "${BLUE}Building database${NC}"
	@sudo docker compose up -d

frontend:
	@echo "${BLUE}Building frontend${NC}"
	@cd frontend && npm install && ng serve --port 4200 --host 0.0.0.0

backend:
	@echo "${BLUE}Building backend${NC}"
	@cd backend && npm install && npm run start:dev --port 3000

stop:
	@echo "${YELLOW}Stopping containers${NC}"
	@sudo docker compose down

clean:
	@echo "${RED}Cleaning containers${NC}"

.PHONY: build database frontend backend stop clean