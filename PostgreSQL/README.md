# PostgreSQL

この文章ではPostgreSQLの基本的な使い方と、このディレクトリ内のファイルについて説明する。

## 起動
```bash
systemctl start postgresql
systemctl enable postgresql
```

## 初期設定
rootユーザー"postgres"のパスワードの設定と、testユーザー,テストデータベースの作成を行う

```bash
su - postgres
psql -c "alter user postgres with password 'password'"
createuser test
psql -c "alter user test with password 'test';"
createdb testdb -O test
```

### パスワード認証でログインできるように設定する
PostgresSQLは標準ではOSのユーザーと結びるけるような認証を行う設定である。ログイン時にユーザー名を指定しDBで設定したパスワードで認証を行うには設定を変更する必要がある。
"/var/lib/pgsql/data/pg_hba.conf"の80行目付近を以下のように変更する

```vi:/var/lib/pgsql/data/pg_hba.conf
#local  all         all              peer
#local  all         all              ident sameuser
local   all         all              md5
```
変更したらサービスのリスタートを行う


## ログインする
```bash
#psql -d データベース名 -U ユーザ名
psql -d testdb -U test
```
データベースのユーザー名とOSのユーザー名が同じ場合はオプション無しでデータベース名だけを指定してログインできる。

## テーブルの作成と表示と削除
テーブルの表示
```sql
\d

```
テーブルの作成と削除

```sql
create table test ( no int,name text );
insert into test (no,name) values (1,'cent');
select * from test;
drop table test;
```

## バックアップと復元
###論理バックアップ
データベースの中身をSQLの形で抽出する
testdbのバックアップは、
```bash
pg_dump testdb > dumpfile
```
testdbの復元は、
```bash
pg_dump testdb > dumpfile
```
