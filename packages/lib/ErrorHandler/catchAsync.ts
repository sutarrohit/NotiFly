const catchAsync = (myFn: Function) => {
  return (error: any) => {
    myFn().catch((error: any) => {
      throw Error("This is error");
    });
  };
};

export default catchAsync;
