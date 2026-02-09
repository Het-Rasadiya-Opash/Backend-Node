import { registerUserSchema } from "../validators/auth-validator.js";
import { authModel } from "../models/auth-model.js";

export const postRegister = async (req, res) => {
  const result = registerUserSchema.safeParse(req.body);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      return res.status(400).json({ message: `${issue.message}` });
    });
  }
  const { email, password, name } = result.data;

  const auth = await authModel.create({
    email,
    password,
    name,
  });

  res.status(200).json({
    auth,
  });
};
