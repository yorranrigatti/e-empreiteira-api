import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import Client from "../../entities/client";
import { AppError } from "../../errors/appError";

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  client: Client;
}

export default class ClientLoginService {
  public async execute({ email, password }: Request): Promise<Response> {
    const clientRepository = AppDataSource.getRepository(Client);

    const client = await clientRepository.findOne({
      where: { email },
    });

    if (!client) {
      throw new AppError("Incorrect email / password combination");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect email / password combination");
    }

    const token = sign({}, process.env.SECRET_KEY || "default", {
      subject: client.id,
      expiresIn: "3d",
    });

    return {
      client,
      token,
    };
  }
}
