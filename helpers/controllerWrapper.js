const controllerWrapper = (controller) => {
  const funcWrap = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      // 1 variant
      // const { status = 500, message = "Server error" } = error;
      // res.status(status).json({ message });
      // console.error(error);
      // 2 variant
      // res.status(500).json({
      //   message: "Server error",
      // });
      // 3 variant
      next(error);
    }
  };

  return funcWrap;
};

module.exports = controllerWrapper;
