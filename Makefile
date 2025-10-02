# Electromagnetic Spectrum Explorer - Makefile
# Wraps npm scripts for easier command execution

.DEFAULT_GOAL := help

# PHONY targets (don't create files)
.PHONY: help dev dev-test build lint preview test test-ui test-run test-coverage test-legacy

##@ Help

help: ## Display this help message
	@echo ""
	@echo "╔════════════════════════════════════════════════════════════════╗"
	@echo "║  Electromagnetic Spectrum Explorer - Available Commands        ║"
	@echo "╔════════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf ""} \
		/^[a-zA-Z_-]+:.*?##/ { \
			printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 \
		}' $(MAKEFILE_LIST)
	@echo ""
	@echo "Examples:"
	@echo "  make dev              # Start development server"
	@echo "  make test             # Run tests in watch mode"
	@echo "  make build            # Build for production"
	@echo "  make lint             # Check code quality"
	@echo ""
	@echo "For more information, see package.json scripts section."
	@echo ""

##@ Development

dev: ## Start the Vite development server
	npm run dev

dev-test: ## Start dev server with tests enabled (opens browser with ?runTests=true)
	npm run dev:test

##@ Build

build: ## Build the application for production
	npm run build

preview: ## Preview the production build locally
	npm run preview

##@ Code Quality

lint: ## Run ESLint to check code quality
	npm run lint

##@ Testing

test: ## Run tests in watch mode (interactive)
	npm run test

test-ui: ## Run tests with Vitest UI interface
	npm run test:ui

test-run: ## Run all tests once (non-interactive)
	npm run test:run

test-coverage: ## Run tests and generate coverage report
	npm run test:coverage

test-legacy: ## Display instructions for legacy browser-based tests
	npm run test:legacy

