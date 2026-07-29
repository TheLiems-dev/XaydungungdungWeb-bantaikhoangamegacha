# Gacha Acc Shop - Web Bán Tài Khoản Game Gacha

Hệ thống quản lý và bán tài khoản game gacha (Wuthering Waves, Genshin Impact, Zenless Zone Zero) xây dựng với NestJS + React.

## Công nghệ

- **Backend**: NestJS, TypeORM, MySQL, JWT, Swagger
- **Frontend**: React, Vite, Tailwind CSS, Axios

## Tính năng

- Quản lý tài khoản game (thêm/sửa/xoá/lọc)
- Đăng ký / Đăng nhập (JWT)
- Phân quyền Admin / Customer
- Mua hàng và quản lý đơn hàng
- API Documentation (Swagger)
- Unit Test + E2E Test

## Cài đặt

### Yêu cầu

- Node.js >= 18
- MySQL/MariaDB

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Server chạy tại `http://localhost:3000`  
Swagger UI: `http://localhost:3000/api`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Chạy tại `http://localhost:5173`

### Cấu hình Database

Mặc định kết nối đến:
- Host: `localhost`
- Port: `3306`
- User: `root`
- Password: `namcan1234az`
- Database: `Gacha_Acc_Shop`

Có thể tuỳ chỉnh qua biến môi trường `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`.

## API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | /auth/register | Đăng ký | - |
| POST | /auth/login | Đăng nhập | - |
| GET | /account | Danh sách tài khoản | - |
| POST | /account | Thêm tài khoản | Admin |
| GET | /account/:id | Chi tiết tài khoản | - |
| PATCH | /account/:id | Sửa tài khoản | Admin |
| DELETE | /account/:id | Xoá tài khoản | Admin |
| POST | /orders | Tạo đơn hàng | Customer |
| GET | /orders/me | Đơn hàng của tôi | Customer |
| GET | /orders | Tất cả đơn hàng | Admin |

## Test

```bash
# Unit Test
npm test

# E2E Test
npm run test:e2e
```

## Tài khoản mẫu

```
Username: admin
Password: admin123
Role: Admin
```
