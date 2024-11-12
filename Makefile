.PHONY: help init create

help:
	@echo "Usage: make [init|create]"
	@echo "  init    Initialize Ansible vault variables"
	@echo "  create  Start playbooks with defined order"

init:
	@echo "\033[1mInitializing vault configuration...\033[0m\n"
	@echo "\033[1mGitLab User Configuration\033[0m"
	@read -p "Enter password for default gitlab user(project_admin): " -s password; \
	password=$$(echo "$$password" | xargs); \
	if [ -z "$$password" ]; then \
		echo "\ninput shouldn't be empty"; \
		exit 1; \
	fi; \
	echo "\n\n\033[1mDocker Hub Authentication\033[0m"; \
	read -p "Enter your docker username: " docker_user; \
	docker_user=$$(echo "$$docker_user" | xargs); \
	if [ -z "$$docker_user" ]; then \
		echo "\ninput shouldn't be empty"; \
		exit 1; \
	fi; \
	read -p "Enter your docker password: " -s docker_password; \
	docker_password=$$(echo "$$docker_password" | xargs); \
	if [ -z "$$docker_password" ]; then \
		echo "\ninput shouldn't be empty"; \
		exit 1; \
	fi; \
	echo "\n\n\033[1mSnyk Authentication\033[0m"; \
	read -p "Enter your Snyk token: " -s snyk_token; \
	snyk_token=$$(echo "$$snyk_token" | xargs); \
	if [ -z "$$snyk_token" ]; then \
		echo "\ninput shouldn't be empty"; \
		exit 1; \
	fi; \
	echo "\n\n\033[1mAWS Authentication\033[0m"; \
	read -p "Enter your AWS Access key id: " aws_access_key_id; \
	aws_access_key_id=$$(echo "$$aws_access_key_id" | xargs); \
	if [ -z "$$aws_access_key_id" ]; then \
		echo "\ninput shouldn't be empty"; \
		exit 1; \
	fi; \
	read -p "Enter your AWS Secret access key: " -s aws_secret_access_key; \
	aws_secret_access_key=$$(echo "$$aws_secret_access_key" | xargs); \
	if [ -z "$$aws_secret_access_key" ]; then \
		echo "\ninput shouldn't be empty"; \
		exit 1; \
	fi; \
	mkdir -p group_vars/git_group/vaults; \
	echo "\n\n\033[1mCreating encrypted vault: project-variables.yml\033[0m"; \
	echo "api_enviroment:" > group_vars/git_group/vaults/project-variables.yml; \
	echo "  DOCKER_USER: \"$$docker_user\"" >> group_vars/git_group/vaults/project-variables.yml; \
	echo "  DOCKER_PASS: \"$$docker_password\"" >> group_vars/git_group/vaults/project-variables.yml; \
	echo "  SNYK_TOKEN: \"$$snyk_token\"" >> group_vars/git_group/vaults/project-variables.yml; \
	echo "amazon_access:" >> group_vars/git_group/vaults/project-variables.yml; \
	echo "  AWS_ACCESS_KEY_ID: \"$$aws_access_key_id\"" >> group_vars/git_group/vaults/project-variables.yml; \
	echo "  AWS_SECRET_ACCESS_KEY: \"$$aws_secret_access_key\"" >> group_vars/git_group/vaults/project-variables.yml; \
	while ! ansible-vault encrypt group_vars/git_group/vaults/project-variables.yml; do :; done; \
	echo "\n\033[1mCreating encrypted vault: user-password.yml\033[0m"; \
	echo "password: \"$$password\"" > group_vars/git_group/vaults/user-password.yml; \
	while ! ansible-vault encrypt group_vars/git_group/vaults/user-password.yml; do :; done

create:
	@echo "\033[1mStarting playbooks with defined order...\033[0m"
	# Add your logic here to execute the Ansible playbooks

