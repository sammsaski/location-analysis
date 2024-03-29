"""
This file is responsible for the backend logic that scrapes information
about a location after it has been determined in the application.
"""

import beautifulsoup4 as bs

class Scraper():
    def __init__(
        self,
        location: str
    ) -> None:
        """ Constructor method. """
        pass

    def scrape(self) -> list[str]:
        """ Returns a list of relevant information about location. """
        pass

    def format(
        self, 
        data:  list[str]
    ) -> None:
        """ Formats the relevant information before being returned to the 
        application. """
        pass
    
    def run(self) -> dict[str]:
        """ Scrapes, formats, and returns json-formatted information about 
        location to the application. """
        data = self.scrape()
        return self.format(data)


if __name__=="__main__":
    # inputs:
    #   location name
    #   address + location

    scraper = Scraper()
    scraper.run()
