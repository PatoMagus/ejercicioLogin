# ejercicioLogin
Creacion de usuario y listados del mismo con autenticación usando JWT. Backend con Nodejs(Babel(JS)) , Express y Mongodb. Frontend con Angular.

Se debe iniciar mongo
> mongod

Api (Inicia en el puerto 3000)
> npm run devStart

WebUser
> ng serve

Al iniciar la Api creara un usuario por defecto

username: admin

email: admin@user.cl

password: admin

Para crear usuario, realizar (considerar que existen dos roles "admin", "user"):
>POST http://localhost:3000/api/users

>Content-Type: application/json
{
    "username": "user01",
    "password": "user01pass",
    "email": "user01@user.cl",
    "roles": ["admin", "user"]
}

o

>Content-Type: application/json
{
    "username": "user01",
    "password": "user01pass",
    "email": "user01@user.cl"
}

Al no colocar roles, asignara automaticamente un rol de "user"

Una ves dentro del proyecto web se debe iniciar sesion con la cuenta "admin", esto lo llevara a una pagina con la lista de usuarios creados.
