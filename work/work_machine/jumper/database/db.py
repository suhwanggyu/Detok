import pymysql
db = ""

def inTheSearcher(conn):
    global db
    db = pymysql.connect(user=conn['user'],passwd=conn['passwd'],host=conn['host'],db=conn['db'],charset=conn['charset'])
    cursor = db.cursor(pymysql.cursors.DictCursor)
    
    sql = "select * from jumperPoint order by count desc limit 1;"
    cursor.execute(sql)
    result = cursor.fetchall()

    if len(result) > 0:
        sql = "update jumperPoint set count=count+1 where seed = '" + result[0]['seed']+ "' and entryPoint = '"+result[0]['entryPoint'] +"';"
        print(sql)
        cursor.execute(sql)
        db.commit()
        keywords = []
        for element in result:
            keywords.append(element['keyword'])
            print(element['keyword'])
        return (result[0]['seed'], result[0]['entryPoint'], keywords)
    else :
        return (False,False)

def choose(conn):
    global db
    db = pymysql.connect(user=conn['user'],passwd=conn['passwd'],host=conn['host'],db=conn['db'],charset=conn['charset'])
    
    cursor = db.cursor(pymysql.cursors.DictCursor)
    sql = "select * from seed order by count desc limit 2;"
    cursor.execute(sql)
    result = cursor.fetchall()
    if len(result) > 0:
        sql = "update seed set count=count+1 where seed = '" + result[0]['seed']+ "' and works = '"+result[0]['works'] +"';"
        print(sql)
        cursor.execute(sql)
        db.commit()
        keywords = []
        seeds = []
        for element in result :
            keywords.append(element['keyword'])
            seeds.append(element['seed'])
        return (seeds, keywords) 
    else :
        return (False,False)

def insert(url, evidence, seed, conn):
    global db
    db = pymysql.connect(user=conn['user'],passwd=conn['passwd'],host=conn['host'],db=conn['db'],charset=conn['charset'])
    cursor = db.cursor(pymysql.cursors.DictCursor)
    sql = "insert into url values ('" + url + "','" + seed + "','"+ evidence +"');"
    cursor.execute(sql)
    db.commit()
