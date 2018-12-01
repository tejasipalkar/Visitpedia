import csv
import pandas as pd

def main():
	raw_data = []
	line_one = []
	with open('wikiClean.csv', 'r') as fp:
		reader = csv.reader(fp)
		count = 0
		flag = 0
		for line in reader:
			if count == 0:
				line_one.append(line)
				#line_one[0].append('Rank')
				#print(line_one)
				fin_data = pd.DataFrame(line_one)
				print(line_one)
				
			else:
				if len(raw_data) > 1:
					if line[4] == raw_data[-1][4] and line[3] == raw_data[-1][3] and line[2] == raw_data[-1][2]:
						raw_data.append(line)
					else:
						data = pd.DataFrame(raw_data)
						raw_data = []
						raw_data.append(line)
						data["Rank"] = data[1].rank()
						flag = 1
						print(data)
				else:
					raw_data.append(line)
					
				
			if flag == 1:
					fin_data = fin_data.append(data)
					flag = 0

			count += 1
			
	data = pd.DataFrame(raw_data)
	data["Rank"] = data[1].rank()
	fin_data = fin_data.append(data)	
	print(fin_data)

	fin_data.to_csv("RankWikiData.csv")


if __name__ == "__main__":
    x=main()