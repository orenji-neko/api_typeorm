import bcrypt from "bcryptjs";
import db, { Database } from "../_helpers/db";
import type { User } from "./user.model";
export default {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

type newUser = {
  email: string;
  username: string;
  password: string;
  title: string;
  firstName: string;
  lastName: string;
  role: string;
};

async function getAll(): Promise<User[]> {
  return await db.User.find();
}

async function getById(id: string): Promise<User> {
  return await getUser(id);
}

async function create(params: newUser): Promise<void> {
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw new Error(`Email "${params.email}" is already registered`);
  }

  const user = db.User.create(params);

  user.passwordHash = await bcrypt.hash(params.password, 10);

  await user.save();
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function update(id: string, params: any): Promise<void> {
  const user = await getUser(id);

  const usernameChanged = params.username && user.username !== params.username;
  if (
    usernameChanged &&
    (await db.User.findOne({ where: { username: params.username } }))
  ) {
    throw new Error(`Username "${params.username}" is already taken`);
  }

  if (params.password) {
    params.passwordHash = await bcrypt.hash(params.password, 10);
  }

  Object.assign(user, params);
  await user.save();
}

async function _delete(id: string): Promise<void> {
  const user = await getUser(id);
  await user.remove();
}

async function getUser(id: string): Promise<User> {
  const user = await db.User.findOneBy({ id: +id });
  if (!user) throw new Error("User not found");
  return user;
}
