create table inspector(
	`address` char(42) NOT NULL,
    `rate` int NOT NULL,
    `inspectCount` int NOT NULL,
    primary key(address)
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