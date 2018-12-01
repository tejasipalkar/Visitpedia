import numpy as np
import sklearn.cluster
import distance
import csv

#words = "YOUR WORDS HERE".split(" ") #Replace this line
temp = []
with open('raw_dat.csv', 'r',encoding='utf-8',errors='ignore') as myfile:
	reader = csv.reader(myfile)
	for line in reader:
		temp.append(line[0])
print(len(temp))
print(temp)


words = np.asarray(temp) #So that indexing with a list will work
lev_similarity = -1*np.array([[distance.levenshtein(w1,w2) for w1 in words] for w2 in words])
print("lev_similarity calculated")
affprop = sklearn.cluster.AffinityPropagation(affinity="precomputed", damping=0.5)
affprop.fit(lev_similarity)
print("affprop fitted")

cluster_map = {}

for cluster_id in np.unique(affprop.labels_):
    exemplar = words[affprop.cluster_centers_indices_[cluster_id]]
    cluster = np.unique(words[np.nonzero(affprop.labels_==cluster_id)])
    cluster_str = ", ".join(cluster)
    print(" - *%s:* %s" % (exemplar, cluster_str))
    if exemplar not in cluster_map:
    	cluster_map[exemplar] = [cluster_str]
    else:
    	cluster_map[exemplar].append(cluster_str)

print(cluster_map)
print("Cluster computed")
with open('clustered_data.csv', 'w') as csv_file:
    writer = csv.writer(csv_file)
    count = 1
    writer.writerow(['SNO', 'Key', 'Values'])
    for key, value in cluster_map.items():
    	writer.writerow([count, key, value])
    	count += 1
print("Task finished")

