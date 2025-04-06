import { BaseCommand } from "@adonisjs/core/ace";
import type { CommandOptions } from "@adonisjs/core/types/ace";

import OlxOffer from "../app/types/olx_offer.js";

export default class SynchronizeOlx extends BaseCommand {
  static commandName = "synchronize:olx";
  static description = "";

  static options: CommandOptions = {};

  async run() {
    const response = await fetch(
      "https://www.olx.pl/api/v1/offers?category_id=1307&city_id=19701&filter_float_price:from=1000&limit=10",
    );
    const data = (await response.json()) as { data: OlxOffer[] };
    for (const offer of data.data) {
      this.logger.info(offer.title);
    }
  }
}
