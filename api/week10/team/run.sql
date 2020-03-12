DROP TABLE IF EXISTS week10_team_parentchild;
DROP TABLE IF EXISTS week10_team_person;

CREATE TABLE week10_team_person
(
    id serial PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    DOB varchar(255) NOT NULL
);
CREATE TABLE week10_team_parentchild
(
    id serial PRIMARY KEY,
    parent_id integer NOT NULL,
    child_id integer NOT NULL
);
ALTER TABLE week10_team_parentchild ADD CONSTRAINT week10_team_parentchild_fk0 FOREIGN KEY (parent_id) REFERENCES week10_team_person(id);
ALTER TABLE week10_team_parentchild ADD CONSTRAINT week10_team_parentchild_fk1 FOREIGN KEY (child_id) REFERENCES week10_team_person(id);

INSERT INTO week10_team_person (first_name, last_name, DOB) VALUES ('Porter', 'McGary', '06-23-1997');
INSERT INTO week10_team_person (first_name, last_name, DOB) VALUES ('Mikayla', 'McGary', '10-21-1999');
INSERT INTO week10_team_person (first_name, last_name, DOB) VALUES ('Dustin', 'McGary', '02-27-1974');
INSERT INTO week10_team_person (first_name, last_name, DOB) VALUES ('Heather', 'McGary', '12-13-1972');
INSERT INTO week10_team_person (first_name, last_name, DOB) VALUES ('Ashley', 'McGary', '05-18-2004');
INSERT INTO week10_team_person (first_name, last_name, DOB) VALUES ('Madalyn', 'McGary', '12-25-2006');

INSERT INTO week10_team_parentchild (parent_id, child_id) VALUES ((SELECT id FROM week10_team_person WHERE first_name = 'Heather'), (SELECT id from week10_team_person WHERE first_name = 'Porter'));
INSERT INTO week10_team_parentchild (parent_id, child_id) VALUES ((SELECT id FROM week10_team_person WHERE first_name = 'Dustin'), (SELECT id from week10_team_person WHERE first_name = 'Porter'));
INSERT INTO week10_team_parentchild (parent_id, child_id) VALUES ((SELECT id FROM week10_team_person WHERE first_name = 'Heather'), (SELECT id from week10_team_person WHERE first_name = 'Mikayla'));
INSERT INTO week10_team_parentchild (parent_id, child_id) VALUES ((SELECT id FROM week10_team_person WHERE first_name = 'Dustin'), (SELECT id from week10_team_person WHERE first_name = 'Mikayla'));
INSERT INTO week10_team_parentchild (parent_id, child_id) VALUES ((SELECT id FROM week10_team_person WHERE first_name = 'Heather'), (SELECT id from week10_team_person WHERE first_name = 'Ashley'));
INSERT INTO week10_team_parentchild (parent_id, child_id) VALUES ((SELECT id FROM week10_team_person WHERE first_name = 'Dustin'), (SELECT id from week10_team_person WHERE first_name = 'Ashley'));
INSERT INTO week10_team_parentchild (parent_id, child_id) VALUES ((SELECT id FROM week10_team_person WHERE first_name = 'Heather'), (SELECT id from week10_team_person WHERE first_name = 'Madalyn'));
INSERT INTO week10_team_parentchild (parent_id, child_id) VALUES ((SELECT id FROM week10_team_person WHERE first_name = 'Dustin'), (SELECT id from week10_team_person WHERE first_name = 'Madalyn'));

SELECT * FROM week10_team_parentchild;
SELECT * FROM week10_team_person;