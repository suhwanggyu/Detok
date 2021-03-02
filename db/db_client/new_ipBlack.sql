use defender2;
drop table blacklistIP;

create table blacklistIP(
	defendeeName varchar(32) not null,
	ip varchar(32) not null,
    reporteraddress varchar(42) not null,
    primary key (defendeeName, ip),
    foreign key (defendeeName) references defendee(name)
);

create table tt(
	defendeeName varchar(32) not null,
	ip varchar(32) not null,
    reporteraddress varchar(42) not null,
    primary key (defendeeName, ip)
);