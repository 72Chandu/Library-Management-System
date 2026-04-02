postgres=# psql -U postgres
postgres=# CREATE DATABASE library_db;
CREATE DATABASE
postgres=# \c library_db
You are now connected to database "library_db" as user "postgres".
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role VARCHAR(10) CHECK (role IN ('admin', 'member'))
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    author VARCHAR(100),
    genre VARCHAR(50),
    copies_available INT
);

CREATE TABLE borrowed_books (
    borrow_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    book_id INT REFERENCES books(book_id),
    borrow_date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    return_date DATE
);
library_db=# \dt
               List of tables
 Schema |      Name      | Type  |  Owner
--------+----------------+-------+----------
 public | books          | table | postgres
 public | borrowed_books | table | postgres
 public | users          | table | postgres
(3 rows)


library_db=# INSERT INTO users (name, email, role)
library_db-# VALUES ('Chandu', 'chandu@example.com', 'admin');
INSERT 0 1
library_db=# SELECT * FROM users;
 user_id |  name  |       email        | role
---------+--------+--------------------+-------
       1 | Chandu | chandu@example.com | admin
(1 row)


ALTER TABLE users ADD COLUMN password VARCHAR(255);