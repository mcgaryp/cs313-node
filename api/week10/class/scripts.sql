DROP TABLE IF EXISTS class_10_book;

CREATE TABLE class_10_book (
   id SERIAL PRIMARY KEY,
   title varchar(255) NOT NULL
);

insert into class_10_book (title)values ('The Holy Bible');
insert into class_10_book (title)values ('The Book of Mormon');
insert into class_10_book (title)values ('The Pearl of Great Price');
insert into class_10_book (title)values ('The Doctrine and Covenants');