
.PHONY: run-api run-ui run

run-api:
	@echo "Starting API..."
	@dotnet run --project API/Project.API/Project.API/Project.API.csproj

run-ui:
	@echo "Starting UI..."
	@cd UI/techblog && npm install && npm run dev

# Run both API and UI concurrently
run:
	@echo "Starting both api and ui..."
	@start /B make run-api
	@start /B make run-ui

