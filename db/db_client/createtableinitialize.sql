CREATE TABLE copyrighter (
  address char(42) NOT NULL,
  name longtext NOT NULL,
  logo int,
  primary key(address)
);

create table defendee (
	name varchar(32) not null,
    rewardAmount double not null,
    rating int not null,
    inspectCount int not null,
    imgdist longtext,
    detailed longtext,
    mode int not null,
    copyrighterAddress char(42) not null,
    primary key(name),
    foreign key(copyrighterAddress) references copyrighter(address)
);

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

create table inspector(
	`address` char(42) NOT NULL,
    `rate` int NOT NULL,
    `inspectCount` int NOT NULL,
    primary key(address)
);

create table inspect(
	inspectorAddress char(42) not null,
    reportid bigint not null,
    decision bool not null,
    correct bool,
    primary key(inspectorAddress, reportid),
    foreign key(reportid) references report(id),
    foreign key(inspectorAddress) references inspector(address)
);