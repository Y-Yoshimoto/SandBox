# 起動/ビルド用のMakefile

# ビルド用のコマンド
build:
	@docker compose build

up:
	@docker compose up -d
	docker compose ps

start: build up

down:
	@docker compose down

clean:
	@docker compose down --rmi all --volumes
	rm -rf ./node_modules \
		./dist \
		./dev-dist \
		./test-results \
		./playwright-report \
		./coverage \
		eslint-report.html \
		test-results.*
	find ./src -type d -name '__screenshots__' -exec rm -rf {} +

rebuild: clean build up