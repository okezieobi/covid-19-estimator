const { error } = console;

const handleServerErrs = (err, req, res) => {
  res.status(500).send(err.message);
  error(err.message);
};

const throwErr = (err) => { throw err; };

export {
  handleServerErrs, throwErr
};
