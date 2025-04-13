import { HttpContext } from "@adonisjs/core/http";

import SearchQuery from "#models/search_query";
import { createSearchQueryValidator } from "#validators/search_query";

export default class SearchQueriesController {
  async index({ request }: HttpContext) {
    const page = Number(request.input("page", 1));
    const limit = Number(request.input("limit", 10));

    const queries = await SearchQuery.query().paginate(page, limit);
    return queries.toJSON().data;
  }

  async show({ params, response }: HttpContext) {
    const query = await SearchQuery.find(params.id);

    if (query === null) {
      return response.status(404).json({ message: "Zapytanie nie znalezione" });
    }

    return query;
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSearchQueryValidator);
    const searchQuery = await SearchQuery.create(data);

    return response.created(searchQuery);
  }
}
