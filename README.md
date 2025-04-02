# Pexels
This project lists videos using the Pexels API. It uses Laravel for the backend, React for the frontend, and HTML/CSS for styling.

# Project Requirements
Laravel version: 5.11

PHP version: 8.2.12

Node version: 18.20.7

# Installation instructions

Follow these steps to set up the project locally:

## Install PHP dependencies (Laravel)
Navigate to the Pexels/pexels-project directory and run:

'composer install'

This will install the necessary PHP dependencies, including the vendor/ folder.

If Composer prompts for an authentication token, it means you need a GitHub Personal Access Token for private repositories or to avoid rate limits when accessing public GitHub packages.

You can create the auth.json file globally to store authentication information for all projects on your machine, like GitHub tokens or credentials for private repositories.

Location of this file: Linux/macOS: ~/.composer/auth.json or Windows: C:\Users\<YourName>\AppData\Roaming\Composer\auth.json. If this file doenst exist you can create it in this location.

Also you can create auth.json file inside the project and post your personal access token that can be consulted here 'https://github.com/settings/tokens'

Example:

{
  "github-oauth": {
    "github.com": "your-personal-access-token"
}

## Create .env file
The .env file is required to configure environment variables. Copy the content from the env_example.txt file and save it as .env in the project root.

## Install Node dependencies (React)
In the project directory, run:

npm install

This will install the necessary Node.js dependencies needed for the React frontend.

If the command prompts you with an encryption key error like "No application encryption key has been specified", run the following Laravel command to generate a key:

php artisan key:generate

This will create a new APP_KEY in your .env file, allowing Laravel to handle encryption.

# Run project

To start the React development server, run in one terminal:

npm run dev

To start the Laravel development server, run in another terminal:

php artisan serve
