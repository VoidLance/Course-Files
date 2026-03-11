likes_magic = bool(input("Do you like Magic in movies? Y/n: ").lower() == "y")
likes_guns = bool(input("Do you like guns in movies? Y/n: ").lower() == "y")
likes_superheroes = bool(input("Do you like superheroes in movies? Y/n: ").lower() == "y")
recognises_actors = bool(input("Do you recognise actors in movies? Y/n: ").lower() == "y")
enjoys_mystery = bool(input("Do you enjoy mystery in movies? Y/n: ").lower() == "y")
enjoys_romance =bool(input("Do you enjoy romance movies? Y/n: ").lower() == "y")
likes_comedy = bool(input("Do you like comedy in movies? Y/n: ").lower() == "y")
enjoys_martial_arts = bool(input("Do you enjoy martial arts? Y/n: ").lower() == "y")

genre = ""
recommendations = ""

if likes_magic and likes_guns or likes_superheroes:
    genre += "Marvel"
if likes_magic and not likes_guns:
    genre += "fantasy"
if likes_guns or recognises_actors and likes_comedy or enjoys_romance:
    genre += "action"
if likes_superheroes or not likes_magic:
    genre += "superheroes"
if enjoys_mystery and not likes_magic:
    genre += "mystery"
if enjoys_romance and not likes_magic:
    genre += "romance"
if likes_comedy and not likes_magic:
    genre += "comedy"
if enjoys_martial_arts:
    genre += "martial arts"
if genre == "":
    genre = "fantasy"

if "marvel" in genre.lower():
    recommendations += "Spiderman, Doctor Strange, Black Panther, Avengers, "
if "fantasy" in genre.lower():
    recommendations += "Lord of the Rings, Arthur and the Invisibles, "
if "action" in genre.lower():
    recommendations += "Nobody, John Wick, Die Hard, "
if "superheroes" in genre.lower():
    recommendations += "Superman, Man of Steel, Batman Returns, The Dark Knight, Green Lantern, Wonderwoman, "
if "mystery" in genre.lower():
    recommendations += "Sherlock Holmes, The Name of the Rose, Tell No One, Double Jeopardy, The Girl with the Dragon Tattoo, "
if "romance" in genre.lower():
    recommendations += "The Notebook, Mamma Mia, Shakespeare in Love, "
if "comedy" in genre.lower():
    recommendations += "Central Intelligence, Ted, The Hangover, Superbad, "
if "martial_arts" in genre.lower():
    recommendations += "Who am I?, Ong Bak, Crouching Tiger Hidden Dragon, Drunken Master, Ip Man, "
if "martial_arts" and "superhero" in genre.lower():
    recommendations += "Iron Fist, "
if "fantasy" and "romance" in genre.lower():
    recommendations += "Twilight, The Princess Bride, Stardust, Beauty and the Beast, "
if "comedy" and "romance" in genre.lower():
    recommendations += "Serendipity, The Bounty Hunter, The Wedding Planner, She's All That, "


print(recommendations[0:-2])