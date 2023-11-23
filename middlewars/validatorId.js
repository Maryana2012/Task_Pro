export const isValidId = (req, res, next) => {
    const {id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(404).json({message: `${id} is not valid`})
    }
    next();
}