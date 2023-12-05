class APIFeatures {
  #fieldsToExclude = ["limit", "page", "fields", "sort"];

  constructor(query, requestQueryObj) {
    this.query = query;
    this.requestQueryObj = requestQueryObj;
  }

  filter() {
    // 1a) Filtering

    /* Extracting request's query object into object variable */
    const queryObj = { ...this.requestQueryObj };

    /* Deleting all properties which is not related to filtering */
    this.#fieldsToExclude.forEach((field) => delete queryObj[field]);

    // 1b) Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.requestQueryObj?.sort) {
      const sortBy = this.requestQueryObj.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("ranked_at");
    }

    return this;
  }

  limitFields() {
    if (this.requestQueryObj?.fields) {
      /* Extracting fields to select into string separated by a space */
      const fieldsToSelect = this.requestQueryObj.fields.split(",").join(" ");

      /* Selecting specified fields only */
      this.query = this.query.select(fieldsToSelect);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const currentPageNum = +this.requestQueryObj?.page || 1;
    const singlePageLimit = +this.requestQueryObj?.limit || 100;
    const docsToSkip = (currentPageNum - 1) * singlePageLimit;

    this.query = this.query.skip(docsToSkip).limit(singlePageLimit);

    return this;
  }
}

module.exports = APIFeatures;
