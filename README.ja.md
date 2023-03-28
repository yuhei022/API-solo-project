# About

Employee API はシンプルな従業員管理 API です。
GET/POST/PUT/PATCH/DELETE の操作をサポートしています。

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

## PATCH

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
