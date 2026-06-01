// Problema 1: El Sistema de Envíos Todopoderoso (SRP y OCP)

class Order {
    constructor(public id: string, public totalAmount: number) {}
}

// Interfaces para abstraer comportamientos (OCP)
interface ShippingMethod {
    calculateCost(): number;
    getName(): string;
}

interface PaymentMethod {
    processPayment(amount: number): void;
}

interface Notifier {
    sendNotification(order: Order): void;
}

// Implementaciones de métodos de envío
class StandardShipping implements ShippingMethod {
    calculateCost(): number {
        return 10;
    }

    getName(): string {
        return "standard";
    }
}

class ExpressShipping implements ShippingMethod {
    calculateCost(): number {
        return 25;
    }

    getName(): string {
        return "express";
    }
}

class DroneShipping implements ShippingMethod {
    calculateCost(): number {
        return 35;
    }

    getName(): string {
        return "drone";
    }
}

// Implementaciones de métodos de pago
class PayPalPayment implements PaymentMethod {
    processPayment(amount: number): void {
        console.log(`Procesando pago de $${amount} vía PayPal...`);
    }
}

class CreditCardPayment implements PaymentMethod {
    processPayment(amount: number): void {
        console.log(`Cargando $${amount} a la tarjeta de crédito...`);
    }
}

// Implementación de notificador
class EmailNotifier implements Notifier {
    sendNotification(order: Order): void {
        console.log(`Email enviado: Su pedido ${order.id} ha sido procesado.`);
    }
}

// Servicio de pedidos refactorizado (SRP)
class OrderService {
    private shippingCalculator: ShippingMethod;
    private paymentProcessor: PaymentMethod;
    private notifier: Notifier;

    constructor(
        shippingCalculator: ShippingMethod,
        paymentProcessor: PaymentMethod,
        notifier: Notifier
    ) {
        this.shippingCalculator = shippingCalculator;
        this.paymentProcessor = paymentProcessor;
        this.notifier = notifier;
    }

    processOrder(order: Order): void {
        const shippingCost = this.shippingCalculator.calculateCost();
        console.log(`Calculando envío para ${this.shippingCalculator.getName()}: $${shippingCost}`);

        const totalAmount = order.totalAmount + shippingCost;
        this.paymentProcessor.processPayment(totalAmount);

        this.notifier.sendNotification(order);
    }
}

// Ejemplo de uso
const order = new Order("ORD-123", 100);
const standardShipping = new StandardShipping();
const payPal = new PayPalPayment();
const emailNotifier = new EmailNotifier();

const orderService = new OrderService(standardShipping, payPal, emailNotifier);
orderService.processOrder(order);
