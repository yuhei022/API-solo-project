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
        id: 6,
        name: 'Taro Yamada',
        age: 25,
      }
```

## PATCH

```
PATCH /api/employees/:id
```

## PUT

## DELETE

# Installation

git clone

```
git clone https://github.com/yuhei022/API-solo-project.git
```

npm install

```
npm i
```

# Contact
