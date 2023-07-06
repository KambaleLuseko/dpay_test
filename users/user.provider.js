"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProviders = void 0;
const user_model_1 = require("./user.model");
exports.userProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useValue: user_model_1.UserModel,
    },
];
//# sourceMappingURL=user.provider.js.map