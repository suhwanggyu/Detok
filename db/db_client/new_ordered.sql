create table ordered(
	orderedId bigInt not null AUTO_INCREMENT PRIMARY KEY,
	customerAddress char(42) not null,
    sellId int not null,
	buyDate DATETIME not null,
    decision bool not null,
    userId varchar(30),
    foreign key(sellId) references saleitems(itemId)
);