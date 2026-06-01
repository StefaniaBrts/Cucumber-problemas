// Problema 3: El Interruptor Rígido (DIP)

// Abstracción (Interface)
interface Switchable {
    turnOn(): void;
    turnOff(): void;
}

// Implementaciones concretas
class TraditionalBulb implements Switchable {
    turnOn() { console.log("Bombilla tradicional encendida... consumiendo mucha energía."); }
    turnOff() { console.log("Bombilla tradicional apagada."); }
}

class SmartLight implements Switchable {
    turnOn() { console.log("Lámpara inteligente encendida... ajustando brillo automático."); }
    turnOff() { console.log("Lámpara inteligente apagada."); }
}

class Fan implements Switchable {
    turnOn() { console.log("Ventilador encendido... velocidad media."); }
    turnOff() { console.log("Ventilador apagado."); }
}

// Interruptor que depende de la abstracción (DIP)
class Switch {
    private device: Switchable;

    constructor(device: Switchable) {
        this.device = device;
    }

    operate(action: string) {
        if (action === "on") {
            this.device.turnOn();
        } else {
            this.device.turnOff();
        }
    }
}

// Ejemplo de uso
console.log("--- Bombilla tradicional ---");
const traditionalBulb = new TraditionalBulb();
const bulbSwitch = new Switch(traditionalBulb);
bulbSwitch.operate("on");
bulbSwitch.operate("off");

console.log("\n--- Lámpara inteligente ---");
const smartLight = new SmartLight();
const smartSwitch = new Switch(smartLight);
smartSwitch.operate("on");
smartSwitch.operate("off");

console.log("\n--- Ventilador ---");
const fan = new Fan();
const fanSwitch = new Switch(fan);
fanSwitch.operate("on");
fanSwitch.operate("off");
