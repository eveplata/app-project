## APP MOVIL EMPRESA JIMENA

Aplicación móvil para la empresa Jimena:

## Requisitos

- Node.js V14.18.0 o superior
- Git
- Ionic Cli

## Configuracion inicial

Clone el repositorio e instale las dependencias

Instalar las dependencias:

```bash
npm install
```

o

```bash
npm i
```

## Configuración para iniciar el proyecto

Para iniciar el servidor express, ejecute lo siguiente

```bash
ionic server
```

Abra [http://localhost:8100](http://localhost:8100) y eche un vistazo.

## Comandos útiles para el proyecto

Aquí hay algunos comandos útiles para el proyecto

### Instalar Ionic
```bash
npm install -g ionic@6.20.1
```

### Crear proyecto
```bash
ionic start nomProject
```

### Crear paginas 
```bash
ionic g page pages/nomArchivo --spec=false
```

### Crear servicios
```bash
ionic g service services/nomArchivo --skipTests=true
```

### Crear componentes
```bash
ionic g component components/error --spec=false
```

### Crear Guards
```bash
ionic g guard guards/login --spec=false
ionic g guard guards/token --spec=false
```

### Crear pipe
```bash
ionic g pipe pipes/horarios --skipTests=true
```

### Crear módulos
```bash
ionic g module pipes
```

## Dependencias de desarrollo instaladas 

### Instalar firebase
```bash
npm install firebase @angular/fire --save
```

### Instalar Ionic Storage
```bash
npm install @ionic/storage-angular
```