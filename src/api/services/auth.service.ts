const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

import BaseApiError from '../../utils/http-errors';
import prismaClient from '../../database/prisma-client';
const { SECRET_KEY } = process.env;

const register = async (registerData: Registration) => {
  const {email, password} = registerData

  const user = await prismaClient.users.findUnique({ where: { email }});
  if (user) {
    throw BaseApiError.Conflict("Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prismaClient.users.create({
      data: {
          ...registerData,
          password: hashPassword
      }
  })

  return { user: { email: newUser.email, name: newUser.name } };
};

const login = async (loginData: Login) => {
  const { email, password } = loginData;

  const user = await prismaClient.users.findUnique({ where: { email }});
  if (!user) {
    throw BaseApiError.Unauthorized('asd');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw BaseApiError.Unauthorized('asdf');
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });

  await prismaClient.users.update({ where: { id: user.id }, data: { token }});

  return { token, user: { email, name: user.name } };
};

export default {
  register,
  login,
};
