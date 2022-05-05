import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

// eslint-disable-next-line prettier/prettier
export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing.", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "95b4a0fe8190dc61d3e9528021ba4ef7"
        ) as IPayload;

        const userRepository = new UsersRepository();
        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exist.", 401);
        }

        next();
    } catch (error) {
        throw new AppError("Invalid token.", 401);
    }
}
