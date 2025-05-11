import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Inicialización del entorno de testing
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: true } }
);

// Configuración adicional de Jasmine
jasmine.getEnv().configure({
  random: false,
  // failFast: true  // Detiene la ejecución al primer error (opcional)
});