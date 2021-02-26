create table saleitems(
	itemId int not null AUTO_INCREMENT PRIMARY KEY,
	sellerAddress char(42) not null,
    sellerName varchar(20) not null,
    detailed longtext,
    tokenamount bigint not null,
    logo longtext
);