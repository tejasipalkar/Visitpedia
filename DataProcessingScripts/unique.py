import csv
import pandas as pd


unique_list = []
word_dict = {}
with open('GoogleClean.csv', 'r', encoding = 'utf-8') as fp:
	reader = csv.reader(fp)
	

	for line in reader:
		if line[0] in word_dict:
			word_dict[line[0]] += 1
		else:
			word_dict[line[0]] = 1

	for w in word_dict:
		unique_list.append(w)

	print(len(word_dict))
	print(len(unique_list))
	data = pd.DataFrame(unique_list)
	data.to_csv("UniqueWordGoogleData.csv")


