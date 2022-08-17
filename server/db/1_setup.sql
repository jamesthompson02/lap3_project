DROP DATABASE IF EXISTS lap3project;

CREATE DATABASE lap3project;

DROP TABLE IF EXISTS scores;

CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    quiz_category VARCHAR(255) NOT NULL,
    score INT NOT NULL
);
