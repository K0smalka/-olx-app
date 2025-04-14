import { HttpContext } from "@adonisjs/core/http";

import SearchQuery from "#models/search_query";
import { createSearchQueryValidator } from "#validators/search_query";
import { updateSearchQueryValidator } from "#validators/update_search_query";

export default class SearchQueriesController {
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSearchQueryValidator);
    const searchQuery = await SearchQuery.create(data);
    return response.created(searchQuery);
  }

  public async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateSearchQueryValidator);

    const searchQuery = await SearchQuery.find(params.id);

    if (searchQuery === null) {
      return response
        .status(404)
        .json({ message: "Rekord nie został znaleziony" });
    }

    searchQuery.merge(payload);
    await searchQuery.save();

    return response.ok(searchQuery);
  }
}
