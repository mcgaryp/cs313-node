DROP TABLE if EXISTS bug_drawings;
DROP USER if EXISTS zumbugzUser;

CREATE TABLE bug_drawings (
   id serial PRIMARY KEY,
   bug_name VARCHAR(255) NOT NULL,
   image VARCHAR(255) NOT NULL,
   type_of_image VARCHAR(255),
   good_image BOOLEAN NOT NULL
);

INSERT INTO bug_drawings (bug_name, image, type_of_image, good_image) VALUES ('Bumblebee Blank Design', '/images/bumblebeeBlank.pdf', 'pdf', true);
INSERT INTO bug_drawings (bug_name, image, type_of_image, good_image) VALUES ('Ladybug Design', '/images/ladybug.pdf', 'pdf', true);
INSERT INTO bug_drawings (bug_name, image, type_of_image, good_image) VALUES ('Ladybug Blank Design', '/images/ladybugBlank.pdf', 'pdf', true);
INSERT INTO bug_drawings (bug_name, image, type_of_image, good_image) VALUES ('Monach Butterfly Design', '/images/monachButterfly.pdf', 'pdf', true);
INSERT INTO bug_drawings (bug_name, image, type_of_image, good_image) VALUES ('Bumblebee Design', '/images/bumblebee.ai', 'ai', true);
INSERT INTO bug_drawings (bug_name, image, type_of_image, good_image) VALUES ('Bumblebee Blank Design', '/images/bumblebeeBlank.ai', 'ai', false);
INSERT INTO bug_drawings (bug_name, image, type_of_image, good_image) VALUES ('Ladybug Design', '/images/ladybug.ai', 'ai', false);
INSERT INTO bug_drawings (bug_name, image, type_of_image, good_image) VALUES ('Ladybug Blank Design', '/images/ladybugBlank.ai', 'ai', false);

CREATE USER zumbugzuser WITH PASSWORD 'password';
GRANT SELECT, INSERT, UPDATE ON bug_drawings TO zumbugzuser;
GRANT USAGE, SELECT ON SEQUENCE bug_drawings_id_seq TO zumbugzuser;

SELECT * FROM bug_drawings;