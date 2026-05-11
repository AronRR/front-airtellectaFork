# Airtellecta UI — Contexto del Proyecto

## Qué es este proyecto

Dashboard interactivo de salud pública con datos de consumo de tabaco y vapeo en México. Población objetivo: jóvenes de 18 a 25 años. Datos de fuentes confiables epidemiológicas.

## Stack

- React 19 + TypeScript (solo TypeScript, sin JS)
- Vite 8
- React Router DOM 7
- Storybook 10
- Recharts (gráficas)
- **Tailwind CSS** (estilos — único sistema permitido, sin CSS plano ni estilos inline)
- Axios (HTTP)
- TanStack Query (server state)
- Firebase (autenticación)
- Jest + React Testing Library (tests unitarios/integración, cobertura mínima 80%)
- Cypress (E2E — 5 flujos principales sin contar auth)

## Especificaciones técnicas obligatorias

- TypeScript en todo el proyecto, sin excepciones
- Tailwind CSS como sistema de estilos principal
- Prohibido: estilos inline (`style={{}}`), archivos `.css` propios
- Axios para todas las llamadas HTTP
- TanStack Query para manejo de estado del servidor
- Firebase para login — token en cada request al backend
- Auth manejada con Context API + localStorage
- Cobertura de tests mínima: 80%
- Cypress con `testID` en 5 flujos E2E principales
- IA puede usarse para apoyar la generación de pruebas

## Arquitectura de carpetas

```
src/
  components/    ← componentes reutilizables, CamelCase
  pages/         ← pantallas completas, CamelCase en inglés
  services/      ← abstracción HTTP y endpoints
  hooks/         ← lógica de negocio separada de componentes
  context/       ← Context API (AuthContext, otros)
  types/         ← interfaces y tipos TypeScript
  assets/        ← imágenes, logos
```

## Pantallas definidas

| Nombre (CamelCase) | Ruta | Estado |
|---|---|---|
| Login | `/login` | Construida — pendiente Firebase |
| Dashboard / ResumenNacional | `/dashboard` | Construida — pendiente datos reales |
| HeatMap | `/dashboard/mapa` | Pendiente |
| Trends | `/dashboard/tendencias` | Pendiente |
| Campaigns | `/dashboard/campanas` | Pendiente |
| Sources | `/dashboard/fuentes` | Pendiente |

## Componentes disponibles (todos en Storybook)

- `ComparisonChart` — Recharts BarChart horizontal/vertical, compara antes/después de intervención
- `EmptyState` — placeholder estado vacío
- `ErrorBanner` — banner de error con acción opcional
- `FormInput` — input con label y error
- `PasswordInput` — input contraseña con toggle
- `PrimaryButton` — botón CTA principal
- `Toast` — notificación success/error
- `MetricCard` — tarjeta de KPI con variantes: default, critical, warning (en ResumenNacional)

## Estado actual del proyecto (mayo 2026)

**Terminado:**
- LoginPage con efecto typewriter, validación de form, simulación de auth
- DashboardLayout: sidebar con NavLinks, header con selector de período, exportar, alertas, notificaciones, UserMenu con tema light/dark/auto (localStorage)
- ConfigModal: editar nombre de usuario, aviso seguridad contraseña
- ResumenNacional: 3 MetricCards + ComparisonChart

**En progreso:**
- Migración de estilos a Tailwind (estilos actuales en archivos .css — hay que eliminarlos)

**Pendiente:**
- Eliminar todos los archivos `.css` tras migración a Tailwind
- Eliminar estilos inline (`style={{}}`) — actualmente en MetricCard (iconBg, iconColor)
- Instalar: Tailwind, Axios, TanStack Query, Firebase
- Crear carpetas: `services/`, `hooks/`, `context/`, `types/`
- Firebase auth real + Context API + route guards (hoy `/dashboard` es accesible sin login)
- Capa de servicios con Axios
- TanStack Query para fetch de datos
- Tests unitarios/integración (Jest + RTL) — actualmente 0%
- Cypress E2E — no instalado
- Páginas pendientes: HeatMap, Trends, Campaigns, Sources
- Conectar UserMenu con datos reales de usuario

## Convenciones

- Nombres de componentes y pantallas: CamelCase en inglés
- Lógica de negocio en hooks, no dentro de componentes
- Componentes reutilizables, sin lógica compleja interna
- Usar `data-testid` en elementos para pruebas
- Git: PRs con revisión y aprobación antes de merge

## Notas para agentes continuadores

- El diseño visual ya tiene una identidad definida (colores, iconos SVG custom, tema oscuro/claro). Respetar la paleta.
- El tema dark/light se aplica con `data-theme` en `<html>` y se persiste en localStorage con clave `airtellecta-theme`.
- Los iconos son SVG inline custom, no de librería externa.
- La autenticación está simulada — al migrar a Firebase, usar Context API en `src/context/AuthContext.tsx`.
- Prohibido `react-router-dom` versión anterior a v7 (ya está en v7).
