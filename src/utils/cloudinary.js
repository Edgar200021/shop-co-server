"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
var cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
var validateEnv_1 = require("./validateEnv");
cloudinary_1.v2.config({
    cloud_name: validateEnv_1.default.CLOUD_NAME,
    api_key: validateEnv_1.default.CLOUD_KEY,
    api_secret: validateEnv_1.default.CLOUD_SECRET,
});
