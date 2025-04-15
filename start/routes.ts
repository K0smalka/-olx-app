/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from "@adonisjs/core/services/router";

const SearchQueriesController = () =>
  import("#controllers/search_queries_controller");

router.post("/api/v1/search-queries", [SearchQueriesController, "store"]);

router
  .resource("/api/v1/search-queries", SearchQueriesController)
  .only(["show", "index"]);

router
  .resource("/api/v1/search-queries", SearchQueriesController)
  .only(["update"]);

router
  .resource("/api/v1/search-queries", SearchQueriesController)
  .only(["destroy"]);
