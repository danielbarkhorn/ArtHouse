import scrapy

class ArtSpider(scrapy.Spider):
    name = 'art'
    start_urls = [
        'https://www.artic.edu/artworks/41033/the-unwelcome-hints-of-mr-shepherd-his-agent-chapter-i-frontispiece-for-jane-austen-s-persuasion?sort_by=title&is_public_domain=1',
    ]


    def parse(self, response):
        title = response.css('span.o-article__inline-header-title::text').get()
        link = response.css('button::attr("data-gallery-img-download-url")').get()

        yield {
            'title': title,
            'author':
            'link': link,
        }

        next_page = response.css('a.m-article-header__img-nav-artwork-preview::attr("href")').get()
        print('\n\n\n\n\n\n\n\n' + link + '\n\n\n\n\n\n\n\n')
        yield response.follow(next_page, self.parse)
