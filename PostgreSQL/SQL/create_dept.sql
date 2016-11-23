create table dept (
    dept_id int,
    dept_name VARCHAR(255),
    dept_area VARCHAR(255)
);

insert into dept (dept_id, dept_name, dept_area) values
    (10,"system","tokyo"),
    (20,"system","osaka"),
    (30,"sales","LA"),
    (40,"edu","tokyo"),
    (50,"develop","nagoya");

Create table emp(
    emp_id int,
    emp_name VARCHAR(255),
    dept_id int
    );

insert into emp values
    (101,"sato keiji",10),
    (102,"suzuki kenichi",40),
    (103,"mikami hideki",40),
    (104,"aoki tomio",20);
