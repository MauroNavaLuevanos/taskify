# Taskify

Creador de ToDo's

## Requisitos
- docker
- docker-compose


## Uso local

```shell

docker-comopse build
docker-compose up
```

### Testing

Es necesario que esten corriendo los servicis de back y db, esto deberia ser un hecho si ya se arranco el docker-compose

```shell
docker-compse run back python manage.py test tasks
docker-compse run back python manage.py test users
```

Los tests estan en backend/tasks/tests.py

## Funcionamiento
Una vez corriendo en local se puede acceder al front desde [http://localhost:3000](http://localhost:3000)

Para poder interactuar con las tareas en necesario hacer login.
