import HttpError from "../helpers/httpError.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error && error.details[0].type === "any.required") {
      const requiredData = error.details[0].context.label;
      next(HttpError(400, `Missing required "${requiredData}" field`));
    } else if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};
export default validateBody;
