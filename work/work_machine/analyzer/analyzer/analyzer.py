import time
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from database import db
from selenium.webdriver.remote.webelement import WebElement
import threading, queue

maxcount = 0
searchBar = ""
AnswerIndex = 0
lock = threading.Lock()
q = queue.Queue()
exploreQ = queue.Queue()
exploreResult = []
def checker(url, properties, keyword) :
    global lock
    global maxcount
    global searchBar
    global AnswerIndex
    driver = webdriver.Chrome('/WebDriver/bin/chromedriver')
    driver.get(url)
    time.sleep(5)
    try :
        if properties[2] != '' :
            item = driver.find_element_by_id(properties[2])
        elif properties[1] != '':
            item = driver.find_element_by_name(properties[1])
        else :
            item = driver.find_element_by_xpath('//input[@title="'+ properties[0] +'" or @name="'+ properties[1] +'" or @id="'+ properties[2] +'"]')
        item.send_keys(keyword)
        item.send_keys(Keys.ENTER)
        time.sleep(5)
        print("URL : " , driver.current_url)
        if url != driver.current_url :
            box = driver.find_elements_by_partial_link_text(keyword)
            lock.acquire()
            if maxcount <= len(box) :
                maxcount = len(box)
                print(properties)
                searchBar = properties
                print(searchBar)
                lock.release()
    except Exception as ex:
        print(ex)
    finally :
        driver.quit()

def explore(url, keyword) :
    global lock
    global maxcount
    global searchBar
    global AnswerIndex
    driver = webdriver.Chrome('/WebDriver/bin/chromedriver')
    driver.get(url)
    time.sleep(5)
    try :
        if searchBar[2] != '' :
            item = driver.find_element_by_id(searchBar[2])
        elif searchBar[1] != '':
            item = driver.find_element_by_name(searchBar[1])
        else :
            item = driver.find_element_by_xpath('//input[@title="'+ searchBar[0] +'" or @name="'+ searchBar[1] +'" or @id="'+ searchBar[2] +'"]')
        item.send_keys(keyword)
        item.send_keys(Keys.ENTER)
        time.sleep(10)
        with lock :
            exploreResult.append([driver.current_url,keyword])
    except Exception as ex:
        print(ex)
    finally :
        driver.quit()


def worker() :
    while True:
        item = q.get()
        checker(item[0],item[1],item[2])
        q.task_done()

def exploreWorker() :
    while True:
        item = exploreQ.get()
        explore(item[0], item[1])
        exploreQ.task_done()


def analyze(url, mainKeyword, keywords, searchKeyword, seed) :
    global maxcount
    global searchBar

    o = urlparse(url)
    url = o.geturl() 

    driver = webdriver.Chrome('/WebDriver/bin/chromedriver')
    driver.get(url)
    time.sleep(4)

    inputbox = []
    for key in searchKeyword :
        try :
            inputbox.append(driver.find_element_by_xpath('//input[contains(@title,"'+ key +'") or contains(@name,"'+ key +'") or contains(@id,"'+ key +'")]'))
        except :
            pass
    if len(inputbox) == 0 :
        inputbox.append(driver.find_element_by_xpath('//input[not(@type="hidden")]'))
    current = driver.current_url
    threading.Thread(target=worker, daemon=True).start()
    threading.Thread(target=worker, daemon=True).start()
    for item in inputbox :
        print("Nothing, So i will found everything!")
        q.put([current, [item.get_attribute('title'),  item.get_attribute('name'), item.get_attribute('id'),], mainKeyword])
    q.join()
    threading.Thread(target=exploreWorker, daemon=True).start()
    threading.Thread(target=exploreWorker, daemon=True).start()
    threading.Thread(target=exploreWorker, daemon=True).start()
    threading.Thread(target=exploreWorker, daemon=True).start()
    print(keywords)
    for key in keywords :
        print(key)
        exploreQ.put([current, key['keyword']])

    exploreQ.join()
    for record in exploreResult :
        db.insert(record[0], record[1], seed)
    driver.quit()
