import { HttpContext } from "@adonisjs/core/http";

import SearchQuery from "#models/search_query";
import { createSearchQueryValidator } from "#validators/search_query";
import { updateSearchQueryValidator } from "#validators/update_search_query";

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

  async update({ request, params }: HttpContext) {
    const payload = await request.validateUsing(updateSearchQueryValidator);

    const searchQuery = await SearchQuery.findOrFail(params.id);

    searchQuery.merge(payload);
    await searchQuery.save();

    return { message: "Successfully updated search query", searchQuery };
  }

  async destroy({ params }: HttpContext) {
    const query = await SearchQuery.findOrFail(params.id);

    await query.delete();
    return { message: "Search query deleted successfully" };
  }
}
