import sqlite3

from sqlite3 import Error

import json

conn = None


def create_connection(db_file):
    """ create a database connection to a SQLite database """
    try:
        conn = sqlite3.connect(db_file) # :memory: if u want to store in ram
        print(sqlite3.version)
    except Error as e:
        print(e)
    return conn


def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)



def upload_from_json(conn, json_file):
    f = open(json_file, encoding='UTF-8')

    data = json.load(f) 

    cursor = conn.cursor()
  
    # Iterating through the json 
    # list 
    for label in data: 
        #first item is name of muscle group
        muscle_group = data[label][0]

        #second item is a description for the type of workout
        workout_description = data[label][1]

        for yt_data in data[label][2:]:
            sql = ''' INSERT INTO yt_metadata(workout_type,muscle_group, workout_description,title,url,youtube_description)
              VALUES(?,?,?,?,?,?) '''

            if (type(yt_data) == str):
                print("ENTRY: \n" + str(yt_data))
                print()

            
            data_tuple = (label,muscle_group,workout_description,yt_data['title'], yt_data['url'],yt_data['youtube_description'])

            cursor.execute(sql, data_tuple)

            conn.commit()           

    f.close()


if __name__ == '__main__':
    conn = create_connection(r"C:\Users\Sharon Xia\OneDrive\2020-2021 Winter\CS 125\ytmetadata\ytdata.db")

    # create table
    create_table_sqlstmt =  """ CREATE TABLE IF NOT EXISTS yt_metadata (
                                    workout_type text NOT NULL,
                                    muscle_group text NOT NULL,
                                    workout_description text NOT NULL,
                                    title text NOT NULL,
                                    url text,
                                    youtube_description text
                                ); """

    create_table(conn, create_table_sqlstmt)

    upload_from_json(conn, r"""C:\Users\Sharon Xia\Github\Just-Do-It\Exercises Metadata\Metadata.json""")

    conn.close()
    




    #create_table(conn, create_table_sqlstmt)


"""
import json 
  
# Opening JSON file 
f = open('data.json',) 
  
# returns JSON object as  
# a dictionary 
data = json.load(f) 
  
# Iterating through the json 
# list 
for i in data['emp_details']: 
    print(i) 
  
# Closing file 
f.close() 
"""