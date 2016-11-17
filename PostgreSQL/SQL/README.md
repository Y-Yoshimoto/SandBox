# PostgreSQL
## 初期設定
rootユーザー"postgres"のパスワードの設定と、testユーザー,テストデータベースの作成を行う

```bash
su - postgres
psql -c "alter user postgres with password 'password'"
createuser test
psql -c "alter user test with password 'test';"
createdb testdb -O test
```

### ログインする
```bash
#psql データベース名　ユーザ名
psql testdb test
```
データベースのユーザー名とOSのユーザー名が同じ場合はデータベース名だけを指定してログインできる。

### テーブルの作成と表示と削除
```sql
create table test ( no int,name text );
insert into test (no,name) values (1,'cent');
select * from test;
drop table test;
```
