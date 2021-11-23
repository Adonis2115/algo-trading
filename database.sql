CREATE DATABASE stock_data;

--\c into stock_data

CREATE TABLE NIFTY_50 (
    id SERIAL PRIMARY KEY,
    date NUMERIC,
    open NUMERIC,
    high NUMERIC,
    low NUMERIC,
    close NUMERIC
);