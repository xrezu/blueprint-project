# Detector de Fraude

## 1- Preparar los Datos JSON:

Coloca el archivo JSON con la información oficial de la Agencia Tributaria en la carpeta src/assets/json.
Asegúrate de que el formato del JSON sea adecuado para su procesamiento. Debería ser un arreglo de objetos, cada objeto representando una fila de datos.

## 2 - Crear Modelos:

En la carpeta src/app/models, crea un modelo TypeScript (contribuyente.model.ts) que represente la estructura de los datos:

```
export interface Contribuyente {
  nombre: string;
  apellido: string;
  promotor: string;
  entidadFinanciera: string;
  cantidadTotal: number;
  aportacionesMensuales: number;
}
```

## 3- Servicio de Detección de Fraude:

En la carpeta src/app/services, crea un servicio (fraude.service.ts) que se encargue de la lógica para comparar los datos.
Este servicio leerá los datos JSON oficiales y los proporcionados por las entidades financieras, y realizará las comparaciones necesarias.
Implementa métodos para cargar los datos JSON y para ejecutar la lógica de comparación.

Primero, necesitas importar los módulos y servicios necesarios en tu archivo fraude.service.ts:

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contribuyente } from '../models/contribuyente.model';

@Injectable({
  providedIn: 'root'
})
export class FraudeService {
  private datosOficialesUrl = 'assets/json/datos-oficiales.json'; // La ruta al JSON de datos oficiales
  
  constructor(private http: HttpClient) {}

  // Método para cargar los datos oficiales de la Agencia Tributaria
  cargarDatosOficiales(): Observable<Contribuyente[]> {
    return this.http.get<Contribuyente[]>(this.datosOficialesUrl);
  }

  // Método para cargar los datos de las entidades financieras
  cargarDatosEntidades(): Observable<Contribuyente[]> {
    // Aquí deberías reemplazar 'ruta-api-entidades' con la ruta real de tu API
    return this.http.get<Contribuyente[]>('ruta-api-entidades');
  }

  // Método para ejecutar la lógica de comparación
  compararDatos(datosOficiales: Contribuyente[], datosEntidades: Contribuyente[]): any[] {
    const discrepancias = [];
    datosEntidades.forEach(datoEntidad => {
      const datoOficial = datosOficiales.find(dato => dato.nombre === datoEntidad.nombre && dato.apellido === datoEntidad.apellido);
      
      if (datoOficial) {
        // Aquí puedes añadir más lógica para comparar y verificar la información
        if (datoEntidad.cantidadTotal !== datoOficial.cantidadTotal || datoEntidad.aportacionesMensuales !== datoOficial.aportacionesMensuales) {
          discrepancias.push({
            ...datoEntidad,
            discrepancia: true,
            mensaje: 'Las cantidades no coinciden con los datos oficiales.'
          });
        }
      } else {
        discrepancias.push({
          ...datoEntidad,
          discrepancia: true,
          mensaje: 'No se encontró el contribuyente en los datos oficiales.'
        });
      }
    });

    return discrepancias;
  }
}
```
Este servicio se encarga de:

Cargar los datos oficiales desde un archivo JSON localizado en la carpeta assets/json.
Cargar los datos de las entidades financieras, que en este ejemplo se asume que se obtienen de una API externa.
Comparar los dos conjuntos de datos y encontrar discrepancias.
Es importante que adaptes la lógica de comparación en el método compararDatos() a tus necesidades específicas, y también que implementes un método para manejar el llamado a la API real de las entidades financieras en cargarDatosEntidades().

Asegúrate de que el modelo Contribuyente corresponda exactamente a la estructura de los datos que estás manejando, tanto en los datos oficiales como en los proporcionados por las entidades financieras.

## 4- Integración con el Backend

Asumiendo que tienes un backend que provee los datos de las entidades financieras, utilizarías el HttpClient de Angular para recuperar estos datos. Este paso ya se consideró parcialmente en el servicio de detección de fraude que creamos anteriormente, con el método cargarDatosEntidades(). Aquí es donde conectarías con tu API real.

## 5- Componente de Detección de Fraude

Crea un componente llamado fraude-detection que utilizará el servicio de detección de fraude.

```
ng generate component views/fraude-detection
```

En tu componente fraude-detection.component.ts, inyectarás el servicio FraudeService y llamarás a los métodos para cargar los datos y ejecutar la lógica de comparación.

```
import { Component, OnInit } from '@angular/core';
import { FraudeService } from '../../services/fraude.service';
import { Contribuyente } from '../../models/contribuyente.model';

@Component({
  selector: 'app-fraude-detection',
  templateUrl: './fraude-detection.component.html',
  styleUrls: ['./fraude-detection.component.css']
})
export class FraudeDetectionComponent implements OnInit {
  datosOficiales: Contribuyente[];
  datosEntidades: Contribuyente[];
  discrepancias: any[];

  constructor(private fraudeService: FraudeService) {}

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.fraudeService.cargarDatosOficiales().subscribe(
      datosOficiales => {
        this.datosOficiales = datosOficiales;
        // Ahora cargar los datos de las entidades financieras
        this.fraudeService.cargarDatosEntidades().subscribe(
          datosEntidades => {
            this.datosEntidades = datosEntidades;
            this.compararDatos();
          }
        );
      }
    );
  }

  compararDatos() {
    this.discrepancias = this.fraudeService.compararDatos(this.datosOficiales, this.datosEntidades);
  }
}
```

## 6- Lógica de Comparación

Ya describimos la lógica de comparación básica en el servicio FraudeService. Según los requisitos y la complejidad, podrías expandir esa lógica para considerar más campos o realizar comparaciones más sofisticadas.

## 7- Resultados y Alertas

En tu archivo fraude-detection.component.html, mostrarías los resultados de la comparación y las alertas generadas:

```
<div *ngIf="discrepancias && discrepancias.length > 0">
  <h2>Discrepancias Detectadas</h2>
  <ul>
    <li *ngFor="let discrepancia of discrepancias">
      {{ discrepancia.mensaje }}: {{ discrepancia.nombre }} {{ discrepancia.apellido }}
    </li>
  </ul>
</div>
```

## 8- Rutas y Navegación

En el archivo app-routing.module.ts, configurarías una ruta para que los usuarios puedan navegar al componente de detección de fraude:

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FraudeDetectionComponent } from './views/fraude-detection/fraude-detection.component';

const routes: Routes = [
  { path: 'deteccion-fraude', component: FraudeDetectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## 9-  Interfaz de Usuario

Diseñarías la interfaz de usuario en fraude-detection.component.html para presentar los datos y alertas de manera amigable. Utilizarías Angular Material o Bootstrap para los estilos si quieres una interfaz más elaborada.
