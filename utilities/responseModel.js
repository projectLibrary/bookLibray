class ResponseModel {
    totalPages = 1;
    perPage = 1;
    pageNumber = 1;
    success = true;
    message = null;
    errors = [];
    constructor(data = null, message = null, errors=[]) {
        this.data = data;
        this.message = message;
        this.errors = errors;

        if(errors.length > 0){
            this.success = false;
        }
    }
}

module.exports = ResponseModel