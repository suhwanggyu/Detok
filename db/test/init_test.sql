use defender2;
update defendee set imgdist = "http://13.209.109.159:3001/images/The.jpg" where name like "The%";
update defendee set imgdist = "http://13.209.109.159:3001/images/btson.jpg" where name like "Bts%";
update defendee set imgdist = "http://13.209.109.159:3001/images/Fro.jpg" where name like "Fro%";
update defendee set imgdist = "http://13.209.109.159:3001/images/Its.jpg" where name like "Its%";
update defendee set imgdist = "http://13.209.109.159:3001/images/face.png" where name like "외모%";
update defendee set imgdist = "http://13.209.109.159:3001/images/radioactive.jpeg" where name like "Ra%";
update defendee set imgdist = "http://13.209.109.159:3001/images/yourturn.jpeg" where name like "あなたの番です%";
update defendee set imgdist = "http://13.209.109.159:3001/images/stranger.jpg" where name like "Strange%";
update defendee set imgdist = "http://13.209.109.159:30011/images/believer.jpeg" where name like "Believer%";
update defendee set imgdist = "http://13.209.109.159:3001/images/zoo.jpg" where name like "Zootopia%";
update defendee set imgdist = "http://13.209.109.159:3001/images/sam.jpg" where name like "삼시세끼 어촌편5%";
update defendee set detailed = "Illegal link and download file" where name like "The%";
update defendee set detailed = '불법적인 뮤직비디오와 노래 유통' where name like "Bts%";
update defendee set detailed = "Unlicensed link about Frozen" where name like "Fro%";
update defendee set detailed = "저작권 없는 불법 유통물 신고" where name like "Its%";
update defendee set detailed = "미리보기회 불법 공유 및 저작물 위반" where name like "외모%";
update defendee set detailed = "Report for Plagiarism" where name like "Ra%";
update defendee set detailed = "不法映像申告" where name like "あなたの番です%";
update defendee set detailed = "Unlicensed link about Stranger Things" where name like "Strang%";
update defendee set detailed = "Unlicensed streaming or download page" where name like "Believer%";
update defendee set detailed = "Illegal video about zootopia" where name like "Zootopia%";
update defendee set detailed = "Tving에서 제공하지 않는 불법 유통 경로" where name like "삼시세끼 어촌편5%";



update copyrighter set logo = 3 where name = "Watcha";
update copyrighter set logo = 0 where name = "Disney";
update copyrighter set logo = 1 where name = "Netflix";
update copyrighter set logo = 5 where name = "Bts";
update copyrighter set logo = 3 where name = "Tving";
update copyrighter set logo = 5 where name = "Hulu";
update copyrighter set logo = 4 where name = "Imagine Dragons";
update copyrighter set logo = 2 where name = "Naver";
update copyrighter set logo = 1 where name = "wavve";


update defendee set imgdist = "http://13.209.109.159:3001/images/netflix/rumors.jpg" where name like "루머의%";
update defendee set imgdist = "http://13.209.109.159:3001/images/netflix/lovedeath.jpg" where name like "러브%";
update defendee set imgdist = "http://13.209.109.159:3001/images/netflix/orange.jpg" where name like "오렌지%";
update defendee set imgdist = "http://13.209.109.159:3001/images/netflix/stranger.jpg" where name like "기묘한%";
update defendee set imgdist = "http://13.209.109.159:3001/images/netflix/walking.jpg" where name like "워킹%";
update defendee set imgdist = "http://13.209.109.159:3001/images/netflix/breaking.jpg" where name like "브레%";
update defendee set imgdist = "http://13.209.109.159:3001/images/netflix/good.jpg" where name like "왕좌%";
update defendee set imgdist = "http://13.209.109.159:3001/images/netflix/frozen.jpg" where name like "블랙%";

update defendee set detailed = "불법 유통 영상이 스트리밍 되는 url 신고" where name like "루머의%";
update defendee set detailed = "불법 유통 영상이 스트리밍 되는 url 신고" where name like "러브%";
update defendee set detailed = "불법 유통 영상이 스트리밍 되는 url 신고" where name like "오렌지%";
update defendee set detailed = "불법 유통 영상이 스트리밍 되는 url 신고" where name like "기묘한%";
update defendee set detailed = "불법 유통 영상이 스트리밍 되는 url 신고" where name like "워킹%";
update defendee set detailed = "불법 유통 영상이 스트리밍 되는 url 신고" where name like "브레%";
update defendee set detailed = "불법 유통 영상이 스트리밍 되는 url 신고" where name like "왕좌%";
update defendee set detailed = "불법 유통 영상이 스트리밍 되는 url 신고" where name like "블랙%";


commit;

