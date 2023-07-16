# Productivity App
This is a Productivity App made with Django, HTML, CSS and JavaScript that includes:

A To Do List:
![image](https://github.com/Johta03/Productivity-App/assets/139529712/c2dcc671-bdc2-41da-a8db-cda844d54b17)

A Notes Page:
![image](https://github.com/Johta03/Productivity-App/assets/139529712/5dd8e1a7-0af8-4bd9-b7a9-aca308d773ec)
![image](https://github.com/Johta03/Productivity-App/assets/139529712/c7bdf1c4-b6ad-42b6-930b-af211fd6b6d5)

A Pomodoro Timer:
![image](https://github.com/Johta03/Productivity-App/assets/139529712/ba877c3a-5e86-46f7-b0ad-74ca59c849cb)
![image](https://github.com/Johta03/Productivity-App/assets/139529712/0a2ef42f-34d9-4621-b0bd-bc3aff7066de)

### Setup
To get this repository, run the following command inside your git enabled terminal
```bash
$ git clone https://github.com/Johta03/Productivity-App.git
```
You will need django to be installed in you computer to run this app. Head over to https://www.djangoproject.com/download/ for the download guide

Once you have downloaded django, go to the cloned repo directory and run the following command

```bash
$ python manage.py makemigrations
```

This will create all the migrations file (database migrations) required to run this App.

Now, to apply this migrations run the following command
```bash
$ python manage.py migrate
```

One last step and then the app will be live. We need to create an admin user to run this App. On the terminal, type the following command and provide username, password and email for the admin user
```bash
$ python manage.py createsuperuser
```

Now to run the app live, we just need to start the server and then we can start using the Productivity App. Start the server by following command

```bash
$ python manage.py runserver
```

Once the server is hosted, head over to http://127.0.0.1:8000. This will take you to the log in page. Click the Sign Up hyperlink at the bottom:
![image](https://github.com/Johta03/Productivity-App/assets/139529712/0ca74fdf-8c0f-4cf6-92f9-ca8494cde4ac)

After Signing Up, you will be redirected to the login page. Enter your details and you now have access to the Productivity App!
