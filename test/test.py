import git
import os

# Set the repository URL and local path
repository_url = "https://github.com/napsudtay/ShibaMiniProgram.git"
local_path = "testgit2"

# Create the local path directory if it doesn't exist
if not os.path.exists(local_path):
    os.makedirs(local_path)
    print("The new directory is created!")

# Check if the local repository already exists
if os.path.exists(os.path.join(local_path, '.git')):
    # If it exists, open it
    repo = git.Repo(local_path)
else:
    # If it doesn't exist, clone the repository
    repo = git.Repo.clone_from(repository_url, local_path)

# Get the current branch name
current_branch = repo.active_branch.name

# Fetch the latest changes from the remote repository
repo.remotes.origin.fetch()

# Pull the latest changes from the remote repository
repo.remotes.origin.pull(current_branch)

# Run your custom logic or scripts here after the update
print("Repository is up to date!")
