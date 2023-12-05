"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFeatures = void 0;
var APIFeatures = /** @class */ (function () {
    function APIFeatures(query, queryObj) {
        this.query = query;
        this.queryObj = queryObj;
        this._excludedFields = new Set()
            .add("page")
            .add("sort")
            .add("limit")
            .add("fields");
    }
    APIFeatures.prototype.filter = function () {
        var filterObj = this._splitFilteredFields().filterObj;
        this.query = this.query.find(filterObj);
        return this;
    };
    APIFeatures.prototype.sort = function () {
        var _a = this.queryObj.sort, sort = _a === void 0 ? "createdAt" : _a;
        this.query = this.query.sort(this._splitFields(sort));
        return this;
    };
    APIFeatures.prototype.limitFields = function () {
        var _a = this.queryObj.fields, fields = _a === void 0 ? "-__v" : _a;
        this.query = this.query.select(this._splitFields(fields));
        return this;
    };
    APIFeatures.prototype.paginate = function () {
        var _a = this.queryObj, page = _a.page, limit = _a.limit;
        var defaultPage = isFinite(+page) ? +page : 1, defaultLimit = isFinite(+limit) ? +limit : 10, skip = (defaultPage - 1) * defaultLimit;
        this.query = this.query.skip(skip).limit(defaultLimit);
        return this;
    };
    APIFeatures.prototype._splitFilteredFields = function () {
        var _this = this;
        var filterMap = new Map();
        Object.entries(this.queryObj).forEach(function (_a) {
            var key = _a[0], val = _a[1];
            var primitiveType = typeof val === "string";
            var value = {};
            if (!primitiveType) {
                var key_1 = Object.keys(val)[0];
                value["$".concat(key_1)] = val[key_1];
            }
            !_this._excludedFields.has(key) &&
                filterMap.set(key, primitiveType ? val : value);
        });
        return {
            filterObj: Object.fromEntries(filterMap),
        };
    };
    APIFeatures.prototype._splitFields = function (str) {
        return str.split(",").join(" ");
    };
    return APIFeatures;
}());
exports.APIFeatures = APIFeatures;
