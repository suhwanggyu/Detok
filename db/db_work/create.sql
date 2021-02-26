drop table seed;
drop table keyword;
drop table url;
drop table searchArea;
drop table jumperPoint;
create table seed (
	seed varchar(512) not null,
    keyword varchar(512),
    works varchar(15),
    count int,
    primary key(seed)
);

create table keyword(
	keyword varchar(512) not null,
    country varchar(15),
    classification varchar(15),
    primary key(keyword)
);

create table url(
	url varchar(512) not null,
    seed varchar(512),
    evidence varchar(100)
);

create table searchArea(
	id int not null AUTO_INCREMENT primary key,
	host varchar(64),
    seed varchar(512),
    keyword varchar(512)
);

create table jumperPoint(
    entryPoint varchar(512),
    keyword varchar(512),
    seed varchar(512),
    count int
);