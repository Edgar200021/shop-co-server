"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var morgan_1 = require("morgan");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var express_mongo_sanitize_1 = require("express-mongo-sanitize");
var hpp_1 = require("hpp");
var express_rate_limit_1 = require("express-rate-limit");
var cookie_parser_1 = require("cookie-parser");
var body_parser_1 = require("body-parser");
require("express-async-errors");
var AppError_1 = require("./utils/AppError");
var validateEnv_1 = require("./utils/validateEnv");
var errorController_1 = require("./controllers/errorController");
var productRoutes_1 = require("./routes/productRoutes");
var userRoutes_1 = require("./routes/userRoutes");
var reviewRoutes_1 = require("./routes/reviewRoutes");
var basketRoutes_1 = require("./routes/basketRoutes");
var app = (0, express_1.default)();
app.use([
    (0, helmet_1.default)(),
    express_1.default.json(),
    body_parser_1.default.urlencoded({ extended: true }),
    (0, cookie_parser_1.default)(validateEnv_1.default.JWT_SECRET),
    (0, cors_1.default)(),
    (0, express_mongo_sanitize_1.default)(),
    (0, hpp_1.default)({ whitelist: [] }),
]);
var limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);
if (validateEnv_1.default.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use("/api/v1/products", productRoutes_1.default);
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/review", reviewRoutes_1.default);
app.use("/api/v1/basket", basketRoutes_1.default);
app.all("*", function (req /* res: Response, next: NextFunction*/) {
    throw new AppError_1.AppError("Can't find ".concat(req.originalUrl, " on this server"), 404);
});
app.use(errorController_1.default);
exports.default = app;
