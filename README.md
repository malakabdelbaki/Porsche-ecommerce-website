# Porsche-ecommerce-website

E-commerce website for Porsche

**MAKE SURE YOU HAVE NODE AND GIT INSTALLED**
https://git-scm.com/downloads
https://nodejs.org/en

Start by cloning the project in your **DESIRED** folder directory, write the below command in your terminal
for example mine is in  D:\vscode\Porsche-ecommerce-website>

I recommend you press Ctrl+Shift+N (Opens new VSCode Window) and just start from there.

`git clone https://github.com/malakabdelbaki/Porsche-ecommerce-website.git`

MAKE SURE YOU ARE IN THE PROJECTS DIRECTORY, you can use the `cd Porsche-ecommerce-website` command to access the project's directory

If you get an authorization error, run the following commands and enter your github credentials.

```
git config --global user.email youremail@example.com
git config --global user.password yourpassword
git config --global user.username username
```


Then open the folder and type in the following command
`npm install`

To run the project, use the following command
`npm run start`

To commit your changes use the version control provided by VSCode or type the following commands

```
git add .
git commit -m 'small description of changes'
git push -u origin main
```

To get the latest changes, make sure that every time you start coding, you run this command

```
git pull
```

Make sure to create a .env file and have the following variables inside

```
PORT = 3000
```

To run the project type the following command

```
npm run start
```
