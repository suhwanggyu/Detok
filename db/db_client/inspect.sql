create table inspect (
	inspectorAddress mediumtext not null,
    inspect bool not null,
    reportid bigint not null,
    foreign key (ReportId) references Report(id)
);