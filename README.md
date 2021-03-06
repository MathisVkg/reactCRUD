# React Crud + .NET + MySql

# Instalation

Cloner le repository, placer vous dans le dossier **frontend** faites un **npm install** pour télécharger les packgaes nécessaires au bon fonctionnement.
Vérifier que les dépendances pour le backend dans le nuget package sont bien installées.
<br>
Vous trouverez dans le dossier **Sql files** les fichiers sql pour setup la database.

## Dépendances:
**Frontend**
- bootstrap
- react-icons
- reactstrap
- axios

**Backend**
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.EntityFrameworkCore.Design
- AutoMapper
- BCrypt.Net
- FluentValidation.AspNetCore
- FluentValidation.DependencyInjectionExtensions
- MediaR
- Pomelo.EntityFrameworkCore.MySql

# Lancement de l'application

Pour le frontend, placez-vous dans le dossier frontend dans votre IDE et faites un **npm start**.
<br>
Pour le backend, changer l'utilisateur et le mot de passe dans le fichier **programs.cs** pour correspondre avec votre database et appuyez sur **run** dans votre IDE (riders ou visual studio 2022).

# Erreur possible

Si au moment de votre **npm start** vous avez une erreur "import 'bootstrap/dist/css/bootstrap.min.css' missing" vérifier bien que le package bootstrap est bien installé
grâce à cette commande **npm install --save bootstrap**.
<br><br>
Si vous avez une erreur de CORS, dans le fichier **appsettings.Development.json**, vérifier que la ligne **frontend_url** soit bien écrite comme ceci: "frontend_url": "*".

