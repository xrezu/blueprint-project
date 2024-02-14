## Instalacion de Angular CLI

### 1-Instalación de Node,js y npm 

Angular requiere Node.js y npm (Node Package Manager). Por tanto, necesitaremos ver que version tenemmos, para verlo necesitamos usar los siguientes comandos:

```bash
node --version
npm --version
```

En caso de no estar instalado o estar en una version anterior, realizar el siguiente comando para su instalación:

 ```bash
npm install
```

### 2- Instalar Angular

Una vez instalado Node.js, instalaremos angular, que lo realizaremos con el siguiente comando desde nuestra terminal de IDE

 ```bash
npm install -g @angular/cli
```

Despues de todo el proceso de instalación tendremos que tener un arbol de directorios de la siguiente forma:

![image](https://github.com/Eracres/Angular_Proyect/assets/122403544/0172cfcb-95ab-47f9-a918-7830e1f99889)

Esto dará a entender que tenemos instalado ya Angular.

### 3- Crear un nuevo proyecto en Angular

Para ello ejecutaremos el siguiente comando en nuestro terminal:

 ```bash
ng new mi-proyecto-angular
```

Con ello tendremos nuestro directorio donde realizaremos el proyecto

### 4- Ejecutar la aplcación

Finalmente, para ejecutar la aplicación basta con ir a la carpeta de nuestro proyecto con el siguiente comando:

 ```bash
cd mi-proyecto-angular
```

Y una vez ahí, ejecutar con lo siguiente:

 ```bash
ng serve
```

Esto hará compilar el programa y asignarte el localhost de acceso a nuestro proyecto:

![image](https://github.com/Eracres/Angular_Proyect/assets/122403544/7fd35216-807a-436d-8068-ecfc373e666c)

Como puede apreciarse el local host es el http://localhost:4200/, hacemos click en el enlace y nos llevará al proyecto desde nuestro navegador predeterminado:

![image](https://github.com/Eracres/Angular_Proyect/assets/122403544/4f20c99f-9efc-41d5-8dfd-ea8c98029001)
