# Examen

- Construire une nouvelle entité nommée `Project`.
- Un `Project est décrit comme suit : `

```javascript
{
    name: String,
    creator: User,
    members: [User]
}
```

 - Ajouter une association N-N entre `Project` et `User`.
 
- Exposer les méthodes de CRUD pour cette entitée.
- Ajouter les règles fonctionnelles suivantes:
 - Il ne peut y avoir qu'un seul créateur par projet
 - Il est possible d'avoir plusieurs membres sur un projet.
 - **Seul un créateur** de projet peut ajouter un utilisateur par son identifiant
 - **Seul un créateur** de projet peut supprimer un membre d'un projet par son identifiant.