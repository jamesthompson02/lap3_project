-- DROP DATABASE IF EXISTS lap3project;

-- CREATE DATABASE lap3project;

--\c into lap3project;

--\dt to see all tables

DROP TABLE IF EXISTS scores;

CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    category VARCHAR(255) NOT NULL,
    difficulty VARCHAR(25) NOT NULL,
    question_type VARCHAR(25) NOT NULL,
    score INT NOT NULL,
    category_id INT
);
