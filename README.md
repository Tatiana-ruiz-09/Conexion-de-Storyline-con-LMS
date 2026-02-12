Integración Storyline → Plataforma (SCORM + user.js)


📌 Descripción

Este repositorio documenta la implementación necesaria para permitir la comunicación entre un curso exportado en formato SCORM (Articulate Storyline) y la plataforma mediante el archivo user.js.
El objetivo es enviar variables personalizadas del curso hacia la plataforma utilizando postMessage, permitiendo automatizaciones como:

Paso automático a evaluación
Seguimiento avanzado de progreso
Registro de variables personalizadas
Identificación de dispositivo
Activaciones condicionales desde plataforma



🧩 Arquitectura General

Storyline → Variables internas → user.js → postMessage → Plataforma
El archivo user.js actúa como puente entre el SCORM y la plataforma.


⚙️ Requisitos Previos

Antes de implementar:

Las variables deben existir previamente en Storyline.
Los nombres deben coincidir exactamente (case sensitive).
La plataforma debe estar configurada para escuchar eventos postMessage.
El curso debe exportarse en formato SCORM.



🚀 Proceso de Implementación


1️⃣ Crear variables en Storyline

Ejemplo de variables:

SlidesViewed
TotalSlides
NameSlide
IsComplete
AccessDate
Final_boton



2️⃣ Exportar curso en formato SCORM

Exportar normalmente desde Storyline.


3️⃣ Modificar ## 🚨 Ubicación Correcta del Código

El bloque de comunicación debe agregarse:
⚠️ En la primera línea del archivo user.js, antes de la función existente:

window.InitUserScripts = function()
