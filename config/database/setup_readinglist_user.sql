create user 'readinglistuser'@'10.0.0.%' identified by '67triumph';
grant select on *.* to 'readinglistuser'@'10.0.0.%';
grant select, insert, update, delete on readinglist.* to 'readinglistuser'@'10.0.0.%';
flush privileges;
create user 'readinglistuser'@'localhost' identified by '67triumph';
grant select on *.* to 'readinglistuser'@'localhost';
grant select, insert, update, delete on readinglist.* to 'readinglistuser'@'localhost';
flush privileges;


