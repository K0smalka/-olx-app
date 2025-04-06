import { HttpContext } from "@adonisjs/core/http";

export default class SearchQueriesController {
  async store({ request }: HttpContext) {
    return request.all();
  }
}
