create table defendee (
	name varchar(32) not null,
    rewardAmount double not null,
    rating int not null,
    inspectCount int not null,
    imgdist longtext,
    rangeOfProtection longtext,
    mode int not null,
    copyrighterAddress char(42) not null,
    primary key(name),
    foreign key(copyrighterAddress) references copyrighter(address)
);