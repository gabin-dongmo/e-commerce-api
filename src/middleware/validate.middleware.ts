export const validate = (validator) => {
  return (req, res, next) => {
    const { error: failure } = validator(req.body);
    if (failure) return res.status(400).send(failure.errors);
    next();
  };
};
