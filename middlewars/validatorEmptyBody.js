export const isEmptyBody = (req, res, next) => {
    const keys = Object.keys(req.body);
     if (keys.length === 0) {
       res.status(400).json({ message: 'missing fields' });
       return
    }
    next();
}