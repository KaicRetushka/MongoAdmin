from pymongo import MongoClient

def select_dbs(url):
    try:
        with MongoClient(url, serverSelectionTimeoutMS=3000) as client:
            dbs = client.list_database_names()
            return dbs
    except:
        return False
