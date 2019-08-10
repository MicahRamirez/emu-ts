import { RESTDataSource } from "apollo-datasource-rest";
import cheerio from "cheerio";

interface APIError {
  errorCode: number;
  errorMessage: string;
}
export default class DotaBuffScraper extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://www.dotabuff.com/heroes";
  }

  async getStats() {
    console.log("getting stats");
    let response;
    try {
      response = await this.get(this.baseURL);
    } catch (error) {
      console.log(error);
      return {
        errorCode: 500,
        errorMessage: "It didnt work"
      };
    }
    const heroDataStruct = [];
    const $ = cheerio.load(response);
    $.prototype.logHtml = function() {
      console.log(this.html());
    };
    $(".hero-grid a").each((_, element) => {
      const heroName = element.attribs.href.split("/")[2];
      heroDataStruct.push({ name: heroName });
    });

    return heroDataStruct;
    // heroGrid.forEach(hero => {
    //   console.log("this is hero\n\n", hero);
    //   const heroName = hero;
    // });
    // page.search(".hero-grid a").each do |elem|
    // name = elem['href'].split("/").last
    // hero = Hero.where(name: name).first_or_create
    // hero.name = name
    // hero.display_name = elem.text.strip
    // hero.image_url = "https://dotabuff.com" + elem.search(".hero").first['style'].split("url(").last.split(")").first

    // counter_page = scraper.get("https://www.dotabuff.com/heroes/#{name}/counters?date=patch_7.20")
    // if (counter_page.at(".won"))
    //   overall_win_rate = counter_page.at(".won").text.strip.to_f
    // else
    //   overall_win_rate = counter_page.at(".lost").text.strip.to_f
    // end
    // counters = counter_page.search(".sortable tbody tr")
    // counter_data_array = []
    // counters.each do |counter|
    //   counter_name = counter['data-link-to'].split("/").last
    //   our_advantage = counter.search("[data-value]").first(2).last['data-value'].to_f
    //   counter_data_array.push({ name: counter_name, advantage: our_advantage })
    // end

    // data = {
    //   win_rate: overall_win_rate,
    //   matchups: counter_data_array
    // }
    // hero.data = data

    // hero.save
  }
}
