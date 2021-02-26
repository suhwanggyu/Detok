from jumper import jumper
import atexit
import json
import argparse
from database import db
import time
from urlanalyze import urlanalyze
from functools import partial

import multiprocessing

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Config")
    parser.add_argument("-n", "--network",help="Set database server")
    args = parser.parse_args()
    if args.network == None :
        with open('config.json','r',encoding='utf-8') as f:
            config = json.load(f)
            jumper.crawlerWrapper(config['test']['seed'], config['test']['keywords'], 0, config['db'])

    elif args.network == "db" :
        with open('config.json','r',encoding='utf-8') as f:
            config = json.load(f)
            while True :
                (seeds, keywords) = db.choose(config['db'])
                if seeds == False :
                    print("No report yet")
                    time.sleep(5)
                    continue
                pool = multiprocessing.Pool(processes = multiprocessing.cpu_count())
                func = partial(jumper.crawlerWrapper, keywords=keywords, depth=0, connector=config['db'])
                pool.map(func, seeds)
                pool.close()
                pool.join()

    elif args.network == "searcher" :
        with open('config.json','r',encoding='utf-8') as f:
            config = json.load(f)
            while True :
                (seed, entry, keywords) = db.inTheSearcher(config['db'])
                if seed != False :
                    jumper.fromSearcher(seed, entry, keywords, config['db'])
                time.sleep(10000)