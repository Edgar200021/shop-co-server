"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = require("multer");
var path_1 = require("path");
var AppError_1 = require("./AppError");
var multerStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../../public/img"));
    },
    filename: function (req, file, cb) {
        return cb(null, "".concat(Date.now(), "_").concat(file.originalname));
    },
});
var multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(new AppError_1.AppError("Not an image! Please upload obly images", 400));
    }
};
var upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 1024 * 1024,
    },
});
exports.upload = upload;
