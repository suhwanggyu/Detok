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

create table defendeetmp (
	name varchar(32) not null,
    detailed longtext,
    imgdist longtext,
    primary key(name)
);

create table saleitems(
	itemId int not null AUTO_INCREMENT PRIMARY KEY,
	sellerAddress char(42) not null,
    sellerName varchar(20) not null,
    detailed longtext,
    tokenamount bigint not null,
    logo longtext
);

create table reporttmp(
	domain varchar(255),
    name varchar(20),
    keyword varchar(20)
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

create table inspecttmp(
	address char(42) not null,
    reportid bigint not null
);




create table ordered(
	orderedId bigInt not null AUTO_INCREMENT PRIMARY KEY,
	customerAddress char(42) not null,
    sellId int not null,
	buyDate DATETIME not null,
    decision bool not null,
    userId varchar(30),
    foreign key(sellId) references saleitems(itemId)
);

create table blacklistIP(
	defendeeName varchar(32) not null,
	ip varchar(32) not null,
    reporteraddress varchar(42) not null,
    primary key (defendeeName, ip),
    foreign key (defendeeName) references defendee(name)
);

insert into saleitems values (1,"0xdf0EbF66DE7e17ce3E6dF09f0d4C1688C26B5d86", "Netflix", "Netflix monthly pay", 250, null);
insert into saleitems values (2,"0xdf0EbF66DE7e17ce3E6dF09f0d4C1688C26B5d86", "Youtube", "Youtube Premium monthly pay", 200, null);
insert into saleitems values (3,"0xdf0EbF66DE7e17ce3E6dF09f0d4C1688C26B5d86", "Wavve", "Wavve monthly pay", 100, null);
insert into saleitems values (4,"0xdf0EbF66DE7e17ce3E6dF09f0d4C1688C26B5d86", "Naver", "Buy 100 cookies in Naver", 500, null);

update saleitems set logo = "http://localhost:3001/images/nexflix.png" where sellername like "Net%";
update saleitems set logo = "http://localhost:3001/images/youtube.png" where sellername like "You%";
update saleitems set logo = "http://localhost:3001/images/naver.png" where sellername like "Nav%";
update saleitems set logo = "http://localhost:3001/images/wavve.png" where sellername like "Wav%";

commit;