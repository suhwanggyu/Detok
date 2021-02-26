
create table report (
	id bigint not null AUTO_INCREMENT PRIMARY KEY,
    domain longtext not null,
    reporterAddress mediumtext not null,
    judge bool,
	defendeeName varchar(32) not null,
    ip varchar(32) not null,
    step int not null,
    decision bool,
    detailed longtext,
    foreign key(defendeeName) references defendee(name)
);