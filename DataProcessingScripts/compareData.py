import csv
import pandas as pd

def compData():
	google_data = []
	
	google_dict = {}
	go_dict = {}
	wiki_dict = {}
	g_d ={}

	wiki_set = set()
	google_set = set()

	ex_data = []

	with open('GoogleClean.csv', 'r', encoding='utf-8') as fp:
		reader = csv.reader(fp)
		for line in reader:
			#print(line)
			#google_data.append(line)
			#google_dict[(line[0], line[2], line[3], line[4])] = line
			google_set.add(line[0]+"___"+line[2]+"___"+line[3]+"___"+line[4])
			go_dict[line[0]+"___"+line[2]+"___"+line[3]+"___"+line[4]] = line
			
			if line[0] in google_dict:
				#print("inside")
				google_dict[line[0]].append(line)
			else:
				google_dict[line[0]] = [line]

			#print(google_dict)



	with open('wikiClean.csv', 'r') as Wp:
		reader = csv.reader(Wp)
		for line in reader:
			#wiki_data.append(line)
			#wiki_dict[(line[0], line[2], line[3], line[4])] = line
			wiki_set.add(line[0])
			g_d[(line[0], line[2], line[3], line[4])] = line

	#print(wiki_dict)
	#print(google_dict)
	count = 0
	
	#for key in wiki_dict:
	for key in wiki_set:
		#count += 1
		#print(count)
		if key in google_dict:
			for val in google_dict[key]:
				google_data.append(google_dict[key])

	for k in g_d:
		#print(str(k))
		n = k[0]+"___"+k[1]+"___"+k[2]+"___"+k[3]
		if n in go_dict:
			ex_data.append(go_dict[n])


			

	#print(google_dict)

	print(len(google_data))
	print(len(google_dict))
	print(len(wiki_set))
	print(len(google_set))
	print(len(g_d))
	print(len(ex_data))

	data = pd.DataFrame(ex_data)

	data.to_csv("demoGoogle.csv")



compData()



	
			
