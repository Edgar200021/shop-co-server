import { IQuery } from "../types/query";

export class APIFeatures<T extends Partial<IQuery>> {
  _excludedFields = new Set()
    .add("page")
    .add("sort")
    .add("limit")
    .add("fields");

  constructor(
    public query: any,
    public queryObj: T,
  ) {}

  filter() {
    const { filterObj } = this._splitFilteredFields();

    //console.log(filterObj);
    this.query = this.query.find(filterObj);

    return this;
  }

  sort() {
    const { sort = "createdAt" } = this.queryObj;

    this.query = this.query.sort(this._splitFields(sort));
    return this;
  }

  limitFields() {
    const { fields = "-__v" } = this.queryObj;

    this.query = this.query.select(this._splitFields(fields));
    return this;
  }

  paginate() {
    const { page, limit } = this.queryObj;

    const defaultPage = isFinite(+page) ? +page : 1,
      defaultLimit = isFinite(+limit) ? +limit : 10,
      skip = (defaultPage - 1) * defaultLimit;

    this.query = this.query.skip(skip).limit(defaultLimit);

    return this;
  }

  _splitFilteredFields() {
    const filterMap = new Map();

    Object.entries(this.queryObj).forEach(([key, val]) => {
      const isReferenceType = typeof val === "object";
      const value = {};
      const keys = Object.keys(val);

      if (isReferenceType && keys.length > 0) {
        keys.forEach((el) => {
          value[`$${el}`] = val![el];
        });
      }

      if (isReferenceType) {
        const multipleValues = val![keys[0]]
          .split(",")
          .map((val: string) =>
            keys[0] === "color" ? `#${val.trim()}` : val.trim(),
          );

        value[`$${keys[0]}`] =
          keys[0] === "regex"
            ? new RegExp(val![keys[0]], "i")
            : keys[0] === "elemMatch"
              ? { $in: multipleValues }
              : val![keys[0]];
      }

      console.log(value);
      !this._excludedFields.has(key) &&
        filterMap.set(key, isReferenceType ? value : val);
    });

    return {
      filterObj: Object.fromEntries(filterMap),
    };
  }

  _splitFields(str: string) {
    return str.split(",").join(" ");
  }
}
