import csv
import pandas as pd

def split_date():
	raw_data = []
	#with open('GoogleClean.csv', 'r', encoding = 'utf-8') as fp:
	with open('GoogleData.csv', 'r', encoding = 'utf-8') as fp:
		reader = csv.reader(fp)
		m,n = 0,0
		for line in reader:
			#print(line[2])
	
			if '-' in line[2]:
				temp = line[2].split('-')
				#print("-",temp)
				if int(line[1]) >= 50000:
					if temp[0][:2] == "20":
						raw_data.append([line[0], line[1], temp[1], temp[2], temp[0]])
					else:
						raw_data.append([line[0], line[1], temp[1], temp[0], "20" + temp[2]])
				#print("-")
			# if int(line[1]) < 300000:
			# 	m += 1


			# else:
			# 	n += 1
			# 	raw_data.append(line)
	print(m, n)

			
				
	#print(raw_data)
	data = pd.DataFrame(raw_data)
	data.to_csv("GoogleThresholdClean.csv")


split_date()