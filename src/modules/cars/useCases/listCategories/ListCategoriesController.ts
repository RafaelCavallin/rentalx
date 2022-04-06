import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    // eslint-disable-next-line prettier/prettier
    constructor(private listCategoryUseCase: ListCategoriesUseCase) { }

    handle(reques: Request, response: Response): Response {
        const all = this.listCategoryUseCase.execute();

        return response.json(all);
    }
}

export { ListCategoriesController };
