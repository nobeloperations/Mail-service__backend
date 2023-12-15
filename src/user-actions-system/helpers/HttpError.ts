class HttpError extends Error {
    status: number;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, HttpError);
      }
    }
  }


const createHttpError = (status: number, message: string) => {
    return new HttpError(status, message)
  };
  
export default createHttpError;