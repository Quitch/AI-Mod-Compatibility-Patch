import os
import json
import string
import collections
from os.path import join

for root, dirnames, filenames in os.walk('.'):
  for f in filenames:
    f = f.lower()
    if f[-5:] == ".json":
      try:
        fullpath = join(root, f)
        print("%s" % fullpath)
        fp = open(fullpath)
        data = json.load(fp, object_pairs_hook=collections.OrderedDict)
        fp.close()
        fp = open(fullpath, 'w')
        fp.write(json.dumps(data, separators=(',', ':')))
        fp.close()
      except:
        print ("Error processing some file")