"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidGenerator = void 0;
class UuidGenerator {
    static uuidGenerator() {
        return Buffer.from(`${new Date().toISOString().split('-').join('').split(':').join('').split(' ').join('').split('.').join('').split('T').join('').split('Z').join('')}`).toString('base64');
    }
    static getDate() {
        return `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}:${new Date().getSeconds().toString().padStart(2, '0')}:${new Date().getMilliseconds()}`;
    }
    static getDisplayDate() {
        return `${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}:${new Date().getSeconds().toString().padStart(2, '0')}:${new Date().getMilliseconds()}`;
    }
}
exports.UuidGenerator = UuidGenerator;
//# sourceMappingURL=uuidGenerator.helper.js.map