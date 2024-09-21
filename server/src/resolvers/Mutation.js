const {
  generateAccessToken,
  hashPassword,
  comparePassword,
  generateRefreshToken,
  getTokenPayload,
} = require("../utils");

// auth
const signup = async (parent, args, context, info) => {
  const password = await hashPassword(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });
  return {
    accessToken,
    refreshToken,
    user,
  };
};

const updateUser = async (parent, args, context) => {
  const { email, password, name } = args;
  const { userId } = context;

  const user = await context.prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("No such user found");
  }
  let hashedPassword;
  if (password) hashedPassword = await hashPassword(args.password, 10);

  const updatedUser = await context.prisma.user.update({
    where: { id: userId },
    data: {
      email: email || user.email,
      password: hashedPassword || user.password,
      name: name || user.name,
    },
  });

  return updatedUser;
};

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await comparePassword(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });
  return {
    accessToken,
    refreshToken,
    user,
  };
};

const removeUser = async (parent, args, context, info) => {
  const { userId } = context;
  const dellUserId = args.id;
  console.log(`dellUserId`, args.id);
  const user = await context.prisma.user.findUnique({
    where: { id: dellUserId },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  if (user.id !== userId) {
    throw new Error("You are not authorized to delete this user");
  }

  const deletedUser = await context.prisma.user.delete({
    where: { id: dellUserId },
  });

  return deletedUser;
};

const refreshTokens = async (parent, args, context, info) => {
  const { userId } = await getTokenPayload(args.refreshToken);
  const user = await context.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("No such user found");
  }
  const accessToken = generateAccessToken({ userId: Number(args.id) });
  const refreshToken = generateRefreshToken({ userId: Number(args.id) });

  return {
    accessToken,
    refreshToken,
    user,
  };
};

module.exports = {
  signup,
  updateUser,
  login,
  removeUser,
  refreshTokens,
};
