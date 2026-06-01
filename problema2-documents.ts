// Problema 2: El Procesador de Documentos Rebelde (LSP y ISP)

// Interfaces segregadas (ISP)
interface Openable {
    open(): void;
}

interface Editable {
    edit(): void;
}

interface Savable {
    save(): void;
}

// Documento editable completo
class WordDocument implements Openable, Editable, Savable {
    open() { console.log("Abriendo documento Word..."); }
    edit() { console.log("Editando texto..."); }
    save() { console.log("Guardando cambios en disco..."); }
}

// Documento de solo lectura
class ReadOnlyPDFDocument implements Openable {
    open() { console.log("Abriendo PDF protegido..."); }
}

// Cliente que usa solo la funcionalidad necesaria
class DocumentProcessor {
    processEditableDocument(doc: Openable & Editable & Savable): void {
        doc.open();
        doc.edit();
        doc.save();
    }

    processReadOnlyDocument(doc: Openable): void {
        doc.open();
    }
}

// Ejemplo de uso
const wordDoc = new WordDocument();
const pdfDoc = new ReadOnlyPDFDocument();
const processor = new DocumentProcessor();

console.log("\nProcesando documento Word:");
processor.processEditableDocument(wordDoc);

console.log("\nProcesando PDF protegido:");
processor.processReadOnlyDocument(pdfDoc);
