import json
import argparse
from database import db
from analyzer import analyzer

if __name__ == '__main__' :
    parser = argparse.ArgumentParser(description="Config")
    parser.add_argument("-d","--db", help="Set database server")
    args = parser.parse_args()
    if args.db == None :
        with open('config.json','r',encoding='utf-8') as f :
            config = json.load(f)
            seed = config['test']['seed']
            keyword = config['test']['keywords']
            searchkeywords = config["searchKeyword"]
            keywords = db.findKeyword(config['db'])
            analyzer.analyze(seed, keyword, keywords, searchkeywords, seed)
    else :
        with open("config.json","r",encoding='utf-8') as f:
            config = json.load(f)
            (host, seed, key) = db.choose(config['db'])
            keywords = db.findKeyword(config['db'])
            searchkeywords = config["searchKeyword"]
            print(keywords)
            analyzer.analyze("https://"+host, key, keywords, searchkeywords, seed)