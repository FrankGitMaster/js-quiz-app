# 🧠 JavaScript Quiz App - DOM Mastery

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

Una aplicación interactiva de cuestionarios (Quiz) construida completamente con **JavaScript Vanilla**. 

Este proyecto fue desarrollado con un enfoque estricto en las **buenas prácticas de arquitectura Frontend**, destacando la manipulación eficiente del DOM mediante el uso de etiquetas `<template>` y `DocumentFragment` para optimizar el renderizado y evitar cuellos de botella en el navegador.

🔗 **[Ver Demo en Vivo Aquí] (PON_AQUI_EL_LINK_DE_GITHUB_PAGES_CUANDO_LO_TENGAS)**

## ✨ Características Principales

- **Renderizado Dinámico:** Las preguntas y opciones se inyectan dinámicamente en el DOM.
- **Temporizador Integrado:** Cuenta regresiva por pregunta con limpieza automática de intervalos (`clearInterval`) para evitar fugas de memoria.
- **Validación en Tiempo Real:** Feedback visual inmediato (colores) al seleccionar una respuesta correcta o incorrecta, bloqueando interacciones posteriores.
- **Diseño Responsivo:** Interfaz limpia y adaptable construida con CSS nativo (Nesting) y utilidades de Bootstrap 5.

## 🏗️ Arquitectura y Decisiones Técnicas

Para garantizar el máximo rendimiento y escalabilidad, implementé los siguientes patrones:

1. **Uso de `<template>` y `DocumentFragment`:**
   En lugar de inyectar HTML directamente como strings o hacer múltiples `appendChild` al DOM visible, la UI base reside en etiquetas `<template>`. Las opciones se construyen en memoria dentro de un `DocumentFragment` y se inyectan en un solo renderizado, minimizando los *repaints* del navegador.

2. **Algoritmo Fisher-Yates (Knuth Shuffle):**
   Para garantizar una aleatoriedad matemática imparcial, tanto el orden de las preguntas como el orden de las opciones se mezclan utilizando el algoritmo de Fisher-Yates con complejidad `O(n)`.

3. **Inmutabilidad y Deep Cloning:**
   Para evitar mutar el array original de datos al barajar las opciones, se implementó `structuredClone()` garantizando una copia profunda (Deep Copy) del estado inicial.

4. **Gestión de Estado Centralizada:**
   La lógica de la aplicación se rige por un objeto `appState` (que maneja los índices, el score y los IDs de los intervalos) y un objeto `appConfig` (que maneja los textos y estilos), separando claramente los datos de la capa de presentación.

## 🚀 Instalación y Uso Local

No requiere dependencias ni procesos de compilación (build steps).

1. Clona este repositorio:
   ```bash
   git clone https://github.com/FrankGitMaster/js-quiz-app.git
