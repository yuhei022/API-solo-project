# About

Employee API はシンプルな従業員(Employee)管理 API です。

GET/POST/PUT/PATCH/DELETE の操作をサポートしています。

# Resource "Employee"

```
Table employee {
    id integer [primary key]
    name varchar(255) [not null]
    age integer
}
```

# API Usage

## GET

```
GET /api/employees
```

登録されている全ての従業員を取得して返却します。

```
GET /api/employees?limit=n
```

登録されている従業員を n 件取得して返却します。

```
GET /api/employees/:id
```

指定した ID を持つ従業員を取得して返却します。
ID が存在しなければステータスコード 404 が返却されます。

## POST

```
POST /api/employees
```

リクエストボディに設定された内容で従業員を追加します。

ボディ部の設定例：

```
{
        "id": 6,
        "name": 'Taro Yamada',
        "age": 25,
      }
```

## PATCH

```
PATCH /api/employees/:id
```

リクエストボディに設定された内容で、指定した ID の従業員を更新します。

リクエスト例　（ID が 3 の従業員の age が 30 に更新されます。）

```
#URI
PATCH /api/employees/3

#REQUEST BODY
{
        "age": 30,
      }
```

※指定された ID の従業員が存在しない場合、従業員の追加変更は行わずステータスコード 404 を返却します。

## PUT

```
PUT /api/employees/:id
```

リクエストボディに設定された内容で指定した ID の従業員を更新、もしくは追加します。

リクエスト例　（ID が 7 の従業員の name が"Hoge Fuga"に、age が 25 に更新されます。ID が 7 の従業員が存在しない場合は追加します。）

```
#URI
PUT /api/employees/7

#REQUEST BODY
{
        "name": "Hoge Fuga",
        "age": 25,
      }
```

※以下のようにボディ部でも ID を指定した場合、ボディ部の ID を使用して更新、もしくは追加を行います。以下の例では ID が 7 の従業員が存在した場合は ID が 8 に更新され、
存在しなかった場合は ID が 8 の従業員が追加されます。

```
#URI
PUT /api/employees/7

#REQUEST BODY
{
        "id": 8,
        "name": "Hoge Fuga",
        "age": 25,
      }
```

## DELETE

```
DELETE /api/employees/:id
```

指定した ID を持つ従業員を削除します。

# Installation

git clone

```
git clone https://github.com/yuhei022/API-solo-project.git
```

npm install

```
npm i
```

ローカル環境の DB の設定：".env.local"というファイルをフォルダ直下に作成し、DB のユーザ名やパスワードを設定してください。
.env.local ファイル中身の記載例：

```
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_db_name
```

## Commands

```
npm run test
```

テストを実行します。
（現在のバージョンでは、毎回以下の npm run seed を使用しないと、正しくテストが実行されません。:sweat_smile:）

```
npm run seed
```

DB を seed レコードのみ挿入された状態にします。

# Contact

Author: yuhei022@users.noreply.github.com
