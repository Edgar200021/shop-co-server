"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const DB = `mongodb+srv://Edgar:${process.env.DATABASE_PASSWORD}@my-cluster.4r50tve.mongodb.net/natours?retryWrites=true&w=majority`
var express_1 = require("express");
var app = (0, express_1.default)();
app.listen(4000, function () {
    console.log('listened');
});
