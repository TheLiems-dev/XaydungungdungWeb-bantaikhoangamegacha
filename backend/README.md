# Gacha Account Shop

## Giới thiệu

Dự án **Gacha Account Shop** là một REST API quản lý tài khoản game được xây dựng bằng NestJS + TypeORM + MySQL.

## Công nghệ sử dụng

- **Framework:** NestJS 11
- **ORM:** TypeORM 1.0
- **Database:** MySQL (MariaDB)
- **Validation:** class-validator + class-transformer
- **Testing:** Jest

## Cấu trúc Project

```
src/
├── account/
│   ├── dto/
│   │   ├── create-account.dto.ts
│   │   └── update-account.dto.ts
│   ├── entities/
│   │   └── account.entity.ts
│   ├── account.controller.ts
│   ├── account.controller.spec.ts
│   ├── account.module.ts
│   ├── account.service.ts
│   └── account.service.spec.ts
├── app.module.ts
└── main.ts
```

## Cài đặt

```bash
# Cài đặt dependencies
$ npm install

# Tạo database
$ mysql -u root -p < database/init.sql
```

## Cấu hình Database

Mặc định kết nối đến MySQL tại `localhost:3306`, database `Gacha_Acc_Shop`. Có thể ghi đè bằng biến môi trường:

| Biến | Mặc định |
|------|----------|
| `DB_HOST` | `localhost` |
| `DB_PORT` | `3306` |
| `DB_USERNAME` | `root` |
| `DB_PASSWORD` | `namcan1234az` |
| `DB_DATABASE` | `Gacha_Acc_Shop` |

## Chạy ứng dụng

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Production
$ npm run start:prod
```

## API Endpoints

### `POST /account` — Tạo tài khoản

```json
// Request body
{
  "username": "player1",
  "game_server": "Asia",
  "level": 50,
  "price": 100000,
  "status": "available"
}

// Response 201
{
  "id": 1,
  "username": "player1",
  "game_server": "Asia",
  "level": 50,
  "price": 100000,
  "status": "available"
}
```

### `GET /account` — Lấy danh sách tài khoản

```json
// Response 200
[
  {
    "id": 1,
    "username": "player1",
    "game_server": "Asia",
    "level": 50,
    "price": 100000,
    "status": "available"
  }
]
```

### `GET /account/:id` — Lấy tài khoản theo ID

```json
// Response 200
{
  "id": 1,
  "username": "player1",
  "game_server": "Asia",
  "level": 50,
  "price": 100000,
  "status": "available"
}

// Response 404 — Không tìm thấy
{
  "message": "Account with id 999 not found",
  "error": "Not Found",
  "statusCode": 404
}
```

### `PATCH /account/:id` — Cập nhật tài khoản

```json
// Request body
{
  "price": 120000,
  "status": "sold"
}

// Response 200
{
  "affected": 1
}
```

### `DELETE /account/:id` — Xoá tài khoản

```json
// Response 200
{
  "affected": 1
}
```

## Lưu đồ thuật toán (Activity Diagram)

```mermaid
flowchart TD
    A([Client Request]) --> B{Route?}

    B -->|POST /account| C[Validate DTO\nclass-validator]
    C --> C1{Valid?}
    C1 -->|No| C2[Return 400\nValidation Error]
    C1 -->|Yes| C3[Repository.create +\nsave to DB]
    C3 --> C4[Return 201\nCreated Account]

    B -->|GET /account| D[Repository.find\nSELECT all]
    D --> D1[Return 200\nAccount list]

    B -->|GET /account/:id| E[Repository.findOneBy\nWHERE id = :id]
    E --> E1{Found?}
    E1 -->|No| E2[Return 404\nNot Found]
    E1 -->|Yes| E3[Return 200\nAccount]

    B -->|PATCH /account/:id| F[Repository.update\nSET ... WHERE id = :id]
    F --> F1{Affected?}
    F1 -->|No| F2[Return 404\nNot Found]
    F1 -->|Yes| F3["Return 200 <br> { affected: 1 }"]

    B -->|DELETE /account/:id| G[Repository.delete\nWHERE id = :id]
    G --> G1{Affected?}
    G1 -->|No| G2[Return 404\nNot Found]
    G1 -->|Yes| G3["Return 200 <br> { affected: 1 }"]
```

```bash
# Unit tests
$ npm run test

# Test coverage
$ npm run test:cov
```

## Database Schema

```sql
CREATE DATABASE IF NOT EXISTS Gacha_Acc_Shop;
USE Gacha_Acc_Shop;

CREATE TABLE account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    game_server VARCHAR(100) NOT NULL,
    level INT DEFAULT 1,
    price INT NOT NULL,
    status VARCHAR(50) DEFAULT 'available'
);
```

## Tác giả

- **MSSV:** 24100140
- **Tên:** [Trần Hà Dương]
