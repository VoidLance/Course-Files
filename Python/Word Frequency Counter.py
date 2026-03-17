#Create a function that takes a text string as input
def count_word_frequency(text):
    #Use conditional statements to handle special cases like empty input
    if not text:
        return {}
    text = text.lower().replace(",","").replace(".","").replace("!","").replace("?","")
    words = text.split(" ")
    #Use a dictionary to store the frequency of each word in the text
    frequency = {}
    #Use a recursive function to process the text and update the word frequency dictionary
    def process_words(words, index):
        if index == len(words):
            return frequency

        word = words[index]

        if word in frequency:
            frequency[word] += 1
        else:
            frequency[word] = 1

        process_words(words, index+1)

    process_words(words, 0)
    return frequency

text = input("Enter a text: ")
frequency_dict = count_word_frequency(text)

#Use loops to iterate over words in the text
for word, count in frequency_dict.items():
    print(f"{word}: {count}")