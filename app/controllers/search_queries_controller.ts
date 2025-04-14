import { HttpContext } from "@adonisjs/core/http";

import SearchQuery from "#models/search_query";
import { createSearchQueryValidator } from "#validators/search_query";

export default class SearchQueriesController {
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSearchQueryValidator);
    const searchQuery = await SearchQuery.create(data);
    return response.created(searchQuery);
  }

  async delete({ params, response }: HttpContext) {
    const query = await SearchQuery.find(params.id);

    if (query === null) {
      return response.status(404).json({ message: "Search query not found" });
    }

    await query.delete();
    return response
      .status(200)
      .json({ message: "Search query deleted successfully" });
  }
}
