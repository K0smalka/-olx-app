import { HttpContext } from "@adonisjs/core/http";

import SearchQuery from "#models/search_query";
import { createSearchQueryValidator } from "#validators/search_query";

export default class SearchQueriesController {
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSearchQueryValidator);
    const searchQuery = await SearchQuery.create(data);
    return response.created(searchQuery);
  }

  async destroy({ params }: HttpContext) {
    const query = await SearchQuery.findOrFail(params.id);

    await query.delete();
    return { message: "Search query deleted successfully" };
  }
}
