import scrapy

class ArtSpider(scrapy.Spider):
    name = 'art'
    pageNum = 200
    start_urls = [
        'https://www.artic.edu/search/artworks?page=200',
        'https://www.artic.edu/search/artworks?page=',
    ]

    def parse(self, response):
        for listing in response.css('li.m-listing'):
            title = listing.css('strong.title::text').get()
            link = listing.css('a.m-listing__link::attr("href")').get()
            author = listing.css('span.subtitle::text').get()
            imgLink = listing.css('span.m-listing__img').css('img::attr("data-iiifid")').get()

            yield {
                'title': title,
                'link': link,
                'author': author,
                'imgLink': imgLink,
            }

        self.pageNum += 1
        next_page = self.start_urls[1] + str(self.pageNum)

        yield response.follow(next_page, self.parse)
