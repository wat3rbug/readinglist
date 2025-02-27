
create database readinglist;
use readinglist;

drop table if exists `readinglist`;
drop table if exists `categories`;
create table categories (
	id int not null auto_increment primary key,
	category varchar(40) not null
);


create table readinglist (
	id int not null auto_increment primary key,
	link varchar(400) not null, 
	title varchar(400),
	category int not null default 1,
	foreign key fk_cat(category) references categories(id)
);
insert into categories (category) values ('default');
