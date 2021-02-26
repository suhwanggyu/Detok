import pymysql
db = ""

def choose(conn):
    global db
    db = pymysql.connect(user=conn['user'],passwd=conn['passwd'],host=conn['host'],db=conn['db'],charset=conn['charset'])
    cursor = db.cursor(pymysql.cursors.DictCursor)
    sql = "select * from searchArea order by id desc limit 1;"
    cursor.execute(sql)
    result = cursor.fetchall()
    if len(result) > 0:
        return (result[0]['host'], result[0]['seed'], result[0]['keyword'])
    else :
        return (False,False)

def findKeyword(conn):
    global db
    db = pymysql.connect(user=conn['user'],passwd=conn['passwd'],host=conn['host'],db=conn['db'],charset=conn['charset'])
    cursor = db.cursor(pymysql.cursors.DictCursor)
    sql = "select keyword from seed;"
    cursor.execute(sql)
    result = cursor.fetchall()
    print(result)
    return result

def insert(url, keyword, seed):
    global db
    cursor = db.cursor(pymysql.cursors.DictCursor)
    sql = "insert into jumperPoint values ('" + url + "','" + keyword + "','"+ seed +"',0);"
    cursor.execute(sql)
    db.commit()
