Projet Thématique NodeJS & Javascript Avancé : Grello

Pour votre projet de troisième année vous devrez concevoir une API REST.


Présentation :

Grello a pour but de devenir une plateforme de gestion de taches réservée aux personnes du réseau GES. Votre mission est de concevoir la partie serveur, une API REST en NodeJS permettant aux futurs étudiants de bénéficier de cette plateforme


Modelisation, champs obligatoires (non relationel)

// Project
{
    title: String
}

// User
{
    email: String,
    password: String
}

// Tache 
{
    title: String,
    dueDate: Date
}

// Role 
{
    title: String,
    level: Number
}

// Team
...

1 - Regles d'acces



Les services suivant seront publiques : 


Permettre de consulter la liste des projets 
Permettre de s'inscrire,
Permettre de s'authentifier



Les services nécessitant d'être authentifié seront :


Permettre de CRUD un projet.
Permettre de CRUD une équipe.
Permettre de CRUD les membres d'une équipe.
Permettre de CRUD une tache.
Permettre d'attribuer un rôle à un membre d'une équipe
Permettre de quitter une équipe





2 - Regles fonctionelles


Un projet ne peut être associée qu'a une seule équipe.
Une équipe ne peut être que sur un seul projet.
Un utilisateur peut-être membre de plusieurs équipes.
Une équipe doit obligatoirement être associée à un projet.
Une équipe est automatique créée à la création d'un projet.
Le créateur d'un projet rejoint automatiquement celle-ci lors de sa création avec le role "Admin".
Une tache doit obligatoirement être associée à un projet.
Une tache ne peut être créée que par le créateur du projet ou un membre de l'équipe associée au projet.
Une tache peut être assignée à un membre de l'équipe.
L'assignation d'une tache ne peut se faire que part le createur de l'équipe ou un Admin.
L'attribution/modification d'un rôle pour un membre d'une équipe ne peut se faire que par le créateur de du project associée à l'équipe.
Les roles de membres d'une équipe sont : "Admin", "Manager", "User"
La suppression d'un membre de l'équipe, ne peut se faire que par le créateur de l'équipe, ou un Admin, ou le membre lui-même (quitte le projet).
La liste des taches d'un projet est accessible uniquement par tous les membres du projet
Si un utilisateur quitte une équipe, les taches qui lui sont attribuées reviennent au créateur du projet associée à l'équipe.
La modification d'une tache ne peut se faire que par l'utilisateur assigné sur la tache, le créateur de l'équipe ou un Admin.



3 - Règles Techniques


L'ensemble des échanges sera fera via le Content-Type: application/json.
L'identification d'un utilisateur se fera par le biais d'un échange de Token de le header Authorization.