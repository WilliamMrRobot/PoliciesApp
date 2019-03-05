# PoliciesApp
Policies Management Application

## Login
Existen 2 tipos de usuario. 
admin y client

Para admin esta creado el usuario wil@wil.com con password Pepep.449
Para client esta creado el usuario cliente@cliente.com con password Pepep.449

* Al momento de registrar cualquier usuario, por defecto se creara con el rol de client.

<img width="671" alt="login" src="https://user-images.githubusercontent.com/6864141/53814380-83462000-3f2d-11e9-887e-535a63dc42cc.PNG">

## Interfaz Administrador
### Lista de Polizas
<img width="791" alt="listapolicies" src="https://user-images.githubusercontent.com/6864141/53813800-69580d80-3f2c-11e9-98b2-f39668d477c5.png">
### Crear Poliza 
Se agrega mensaje de validación indicando la regla, no se aplica la regla en front, la regla esta en backend

<img width="789" alt="crear poliza" src="https://user-images.githubusercontent.com/6864141/53813864-8ab8f980-3f2c-11e9-8313-c241d8589327.PNG">

### Se válida la regla de no crear polizas con riesgo alto con una covertura mayor a 50%
Mensaje de error si no se cumple la regla.
<img width="795" alt="validaenbackend" src="https://user-images.githubusercontent.com/6864141/53813912-a91ef500-3f2c-11e9-86c9-4872a9ac1515.PNG">

### Poliza Guardada
Mensaje que indica que la poliza ha sido guardada y se puede visualizar en el listado de polizas
<img width="790" alt="polizaguardada" src="https://user-images.githubusercontent.com/6864141/53813895-a02e2380-3f2c-11e9-9eb7-61466a11796c.PNG">

### Lista de Clientes
Tiene un boton en cada cliente que permite administrar sus polizas.

<img width="788" alt="listaclientes" src="https://user-images.githubusercontent.com/6864141/53813941-b76d1100-3f2c-11e9-8ae1-466153b48762.PNG">

### Interfaz de asignación de polizas
Se muestran las polizas del usuario en la parte superior derecha.
En la parte inferior se muestra el listado total de polizas y se checkean las que se le van a asignar al cliente.

<img width="799" alt="polizasclienteyparaasignar" src="https://user-images.githubusercontent.com/6864141/53813977-c48a0000-3f2c-11e9-8d4e-44b392b38540.PNG">

### Polizas Agregadas
Se seleccionaron 2 polizas del listado y se le agregaron al cliente, inmediatamente aparecen en la parte superior derecha

<img width="796" alt="seagregan2polizasalcliente" src="https://user-images.githubusercontent.com/6864141/53813982-c653c380-3f2c-11e9-95ba-b95e91f7c772.PNG">

### Interfaz del Cliente
Se muestran los detalles de las polizas que tiene asignadas.

<img width="798" alt="listapolizascliente" src="https://user-images.githubusercontent.com/6864141/53814006-d4094900-3f2c-11e9-9da0-efb6fa5dec85.PNG">

### Swagger
Se agrega la libreria swagger para documentar las API y tambien poder hacer pruebas sin necesidad de usar el cliente.

<img width="540" alt="swagger" src="https://user-images.githubusercontent.com/6864141/53814009-d5d30c80-3f2c-11e9-8597-def6792f280b.PNG">
