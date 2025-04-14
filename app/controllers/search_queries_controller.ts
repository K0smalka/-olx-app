import { HttpContext } from "@adonisjs/core/http";

import SearchQuery from "#models/search_query";
import { createSearchQueryValidator } from "#validators/search_query";

export default class SearchQueriesController {
  async index({ request }: HttpContext) {
    const page = Number(request.input("page", 1));
    const limit = Number(request.input("limit", 10));

    return SearchQuery.query().paginate(page, limit);
  }

  async show({ params }: HttpContext) {
    return SearchQuery.findOrFail(params.id);
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSearchQueryValidator);
    const searchQuery = await SearchQuery.create(data);

    return response.created(searchQuery);
  }
}
