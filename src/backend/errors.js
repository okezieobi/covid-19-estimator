const { error } = console;

const handleServerErrs = (err) => error(err.message);

const throwErr = (err) => { throw err; };

export {
  handleServerErrs, throwErr
};
