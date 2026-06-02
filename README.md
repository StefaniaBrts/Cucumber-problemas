# Cucumber-problemas

## Actividad de Principios SOLID

Este repositorio contiene las soluciones a los problemas de los principios SOLID (SRP, OCP, LSP, ISP, DIP).

### Archivos de solución:

- [problema1-shipping.ts](./problema1-shipping.ts) - Sistema de envíos (SRP y OCP)
- [problema2-documents.ts](./problema2-documents.ts) - Procesador de documentos (LSP y ISP)
- [problema3-switch.ts](./problema3-switch.ts) - Interruptor rígido (DIP)

1. El Sistema de Envíos Todopoderoso (problema1-shipping.ts)
Principios aplicados: SRP (Principio de Responsabilidad Única) y OCP (Principio de Abierto/Cerrado).

¿Cuál fue la solución?: * Separación de responsabilidades (SRP): En lugar de tener una única clase gigante que calcule envíos, procese pagos y envíe correos, el código se dividió en clases especializadas con una única razón para cambiar (StandardShipping, PayPalPayment, EmailNotifier). La clase OrderService ahora solo se encarga de orquestar el flujo del pedido.

Extensibilidad sin modificar (OCP): Se crearon las interfaces ShippingMethod, PaymentMethod y Notifier. Si mañana el negocio quiere agregar un nuevo método de envío (por ejemplo, Envío Marítimo), no hace falta tocar el código interno de OrderService; basta con crear una nueva clase que implemente ShippingMethod y pasársela por el constructor.

2. El Procesador de Documentos Rebelde (problema2-documents.ts)
Principios aplicados: ISP (Principio de Segregación de Interfaces) y LSP (Principio de Sustitución de Liskov).

¿Cuál fue la solución?:

Interfaces a medida (ISP): En lugar de forzar una interfaz única Document que obligara a todos los archivos a implementar los métodos open(), edit() y save(), se fragmentó en tres interfaces atómicas: Openable, Editable y Savable.

Cumplimiento de contratos (LSP): Al segmentar las interfaces, la clase ReadOnlyPDFDocument solo implementa Openable. Esto evita el típico error de diseño donde un PDF se ve obligado a lanzar una excepción del tipo throw new Error("No se puede editar") al invocar un método heredado a la fuerza, garantizando que los subtipos puedan usarse de forma segura según sus capacidades reales. El DocumentProcessor utiliza de forma inteligente una intersección de tipos (Openable & Editable & Savable) sólo cuando es estrictamente necesario.

3. El Interruptor Rígido (problema3-switch.ts)
Principio aplicado: DIP (Principio de Inversión de Dependencias).

¿Cuál fue la solución?:

Inversión del control: El problema original de un interruptor rígido suele ser que la clase Switch depende directamente de una clase concreta (como TraditionalBulb), quedando acoplada a ella. La solución implementada introduce una abstracción intermedia: la interfaz Switchable.

Ahora, tanto el interruptor de alto nivel (Switch) como los dispositivos de bajo nivel (TraditionalBulb, SmartLight, Fan) dependen de la interfaz abstracta Switchable. Gracias a esto, el interruptor se volvió completamente genérico y puede controlar cualquier artefacto actual o futuro que cumpla con los métodos turnOn() y turnOff().
