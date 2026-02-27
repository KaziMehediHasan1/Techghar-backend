const createBotConversation = async (payload: any) => {
  const result = await blogModel.create(payload);
  if (!result) {
    throw new AppError(404, "not created blogs");
  }
  return result;
};

export const botServices = {
  createBotConversation,
};
