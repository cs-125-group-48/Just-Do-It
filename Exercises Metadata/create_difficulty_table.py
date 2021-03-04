import sqlite3

from sqlite3 import Error

import json


def create_connection(db_file):
    """ create a database connection to a SQLite database """
    try:
        conn = sqlite3.connect(db_file) # :memory: if u want to store in ram
        print(sqlite3.version)
    except Error as e:
        print(e)
    return conn


def execute_simple_statement(conn, stmt):
    cursor = conn.cursor()

    cursor.execute(stmt)
    conn.commit()


def create_difficulty_table(conn):
    stmt = """CREATE TABLE IF NOT EXISTS user_difficulty as
                SELECT DISTINCT muscle_group FROM yt_metadata;"""

    execute_simple_statement(conn, stmt)


    stmt2 = """ALTER TABLE user_difficulty 
                    ADD difficulty_preference float;"""

    execute_simple_statement(conn, stmt2)


    stmt3 = """UPDATE user_difficulty
                SET 
                    difficulty_preference = 5.0;"""
    execute_simple_statement(conn, stmt3)



def video_difficulty(conn):
    cursor = conn.cursor()

    stmt = """ALTER TABLE yt_metadata 
                ADD difficulty_score float;"""
    execute_simple_statement(conn, stmt)

    # stmt2 = # however we decide on difficulty level
    # execute_simple_statement(stmt2)




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

    video_difficulty(conn)

    conn.close()

