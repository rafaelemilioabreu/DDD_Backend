create database DDDdb
go

use DDDdb
go

create table Book (Id int primary key identity,Title varchar(50),Author varchar(50),Publisher varchar (50),Year Date)

go

INSERT INTO Book (Title, Author, Publisher, Year) VALUES ('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 'Bloomsbury', '1997-06-26')
go


