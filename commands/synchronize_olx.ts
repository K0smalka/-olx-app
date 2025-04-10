import { DateTime } from "luxon";

import { BaseCommand } from "@adonisjs/core/ace";
import type { CommandOptions } from "@adonisjs/core/types/ace";

//import SearchQuery from "#models/search_query";
import OlxOffer from "../app/types/olx_offer.js";

export default class SynchronizeOlx extends BaseCommand {
  static commandName = "synchronize:olx";
  static description = "";

  static options: CommandOptions = {};

  async run() {
    await this.app.boot();
    const { default: SearchQuery } = await import("#models/search_query");
    const queries = await SearchQuery.all();
    for (const query of queries) {
      const url = new URL("https://www.olx.pl/api/v1/offers");
      url.searchParams.set("category_id", "1307");
      url.searchParams.set("region_id", "3");
      url.searchParams.set("city_id", "19701");
      url.searchParams.set("district_id", "391");
      url.searchParams.set("sort_by", "created_at:desc");
      url.searchParams.set("limit", "3");

      url.searchParams.set(
        "filter_float_price:from",
        query.priceMin.toString(),
      );

      url.searchParams.set("filter_float_price:to", query.priceMax.toString());

      const response = await fetch(url.toString());
      const data = (await response.json()) as { data: OlxOffer[] };

      for (const offer of data.data) {
        this.logger.info(
          `[success] Znaleziono mieszkanie spełniające wymagania:${offer.title}`,
        );
      }

      query.refreshedAt = DateTime.now();
      await query.save();
    }
  }
}
