update saleitems set logo = "http://localhost:3001/images/nexflix.png" where sellername like "Net%";
update saleitems set logo = "http://localhost:3001/images/youtube.png" where sellername like "You%";
update saleitems set logo = "http://localhost:3001/images/naver.png" where sellername like "Nav%";
update saleitems set logo = "http://localhost:3001/images/wavve.png" where sellername like "Wav%";

update copyrighter set logo = 3 where name = "Watcha";
update copyrighter set logo = 0 where name = "Disney";
update copyrighter set logo = 1 where name = "Netflix";
update copyrighter set logo = 5 where name = "Bts";
update copyrighter set logo = 3 where name = "Tving";
update copyrighter set logo = 5 where name = "Hulu";
update copyrighter set logo = 4 where name = "Imagine Dragons";
update copyrighter set logo = 2 where name = "Naver";
update copyrighter set logo = 1 where name = "wavve";

commit;