import time
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import threading
from Crypto.Hash import keccak
import random
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from judge import judge
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from database import db
import queue
import multiprocessing
from urlanalyze import urlanalyze

#global variable
visited = {}
MAX_DEPTH = 3
THRESHOLD_LCS = 0.83
lock = threading.Lock()
seedtag = []
ward = ""
maxRank = 0
seed = ""
q = queue.Queue()
conn = ""

def crawler(url, keywords, depth, isHash) :
    global MAX_DEPTH
    global THRESHOLD_LCS
    global ward, maxRank
    global visited
    global lock
    global seedtag
    global seed
    global q
    global conn
    try :
        o = urlparse(url)
        url = o.geturl()
        print(url)

        driver = webdriver.Chrome('/WebDriver/bin/chromedriver')
        driver.get(url)
        time.sleep(3+random.randint(0,3))

        if depth != 0 and isHash == False :
            soup = BeautifulSoup(driver.page_source,"html.parser")
            mytag = [tag.name for tag in soup.findAll()]
            score = judge.lcs_similarity(seedtag, mytag)
            print(score,"  ",url," ", isHash)
            if score >= THRESHOLD_LCS :
                keccak_hash = keccak.new(digest_bits=256)
                keccak_hash.update(url.encode('utf-8'))
                f = open("./evidence/" + keccak_hash.hexdigest() + ".png","wb")
                tmp = driver.get_screenshot_as_png()
                f.write(tmp)
                f.close()
                db.insert(url, keccak_hash.hexdigest(), seed, conn)

        if depth == 0 :
            if seed == "" :
                seed = url
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1)
            box = driver.find_elements_by_tag_name('a')
            soup = BeautifulSoup(driver.page_source,"html.parser")
            if seedtag == [] :
                seedtag = [tag.name for tag in soup.findAll()]

        elif depth < MAX_DEPTH:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1)
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1)
            box = []
            for keyword in keywords:
                box = box + driver.find_elements_by_partial_link_text(keyword)
            if maxRank < len(box) :
                maxRank = len(box)
                ward = url
        else : 
            print("Depth reacth Maxcount")
            box = []

        for i in range (len(box)) :
            nexturl = box[i].get_attribute("href")
            tmp = urlparse(nexturl)
            nexturl = tmp.geturl()
            if type(nexturl) is str and nexturl.startswith("http") :
                keccak_hashnew = keccak.new(digest_bits=256)
                keccak_hashnew.update(nexturl.encode('utf-8'))
                lock.acquire()
                if keccak_hashnew.hexdigest() not in visited :
                    visited[keccak_hashnew.hexdigest()] = url
                    lock.release()
                    hashed = (urlanalyze.Url(url) == urlanalyze.Url(nexturl))
                    q.put([nexturl, keywords, depth+1, hashed])
                else :
                    lock.release()
    except Exception as e:
        print(e)
    finally :
        if lock.locked() : 
            lock.release()
        driver.quit()

def worker() :
    while True:
        item = q.get()
        print(q.qsize())
        crawler(item[0],item[1],item[2],item[3])
        q.task_done()


def crawlerWrapper(url, keywords, depth, connector) :
    global q
    global conn
    print(url)
    conn = connector
    print("CPU count : ", multiprocessing.cpu_count())
    for i in range(multiprocessing.cpu_count()) :
        threading.Thread(target = worker, daemon=True).start()
    q.put([url,keywords,depth, False])
    q.join()




def fromSearcher(seedurl, entry, keywords, connector) :
    global seed
    global seedtag
    seed = seedurl
    driver = webdriver.Chrome('/WebDriver/bin/chromedriver')
    driver.get(seed)
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(4)
    soup = BeautifulSoup(driver.page_source,"html.parser")
    seedtag = [tag.name for tag in soup.findAll()]
    crawlerWrapper(entry, keywords, 0, connector)


def printexit() :
    global ward, maxRank
    print("Ward : ", ward, " Max :" , maxRank)
