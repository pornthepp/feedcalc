
# FeedCalc
### Pig Feed Formula Calculator (Mini-Project)
เว็บแอปพลิเคชันสำหรับคำนวณสัดส่วนวัตถุดิบและต้นทุนในการผลิตอาหารหมู พร้อมระบบจัดการสต็อกวัตถุดิบอัตโนมัติ

เยี่ยมชมเว็ป -> https://feedcalc.netlify.app/

## Tech Stack


![Backend](https://skillicons.dev/icons?i=react,vite,css,java,spring,sqlite)

## Screenshots

![App Screenshot](https://img5.pic.in.th/file/secure-sv1/Screenshot-2026-01-23-124225.png)


## Features

- Smart Calculation: คำนวณปริมาณวัตถุดิบที่ต้องใช้ตามจำนวนการผลิตที่ต้องการ พร้อมสรุปต้นทุนรวม

- Production Limit: ตรวจสอบสต็อกในคลังและแสดงจำนวนการผลิตสูงสุดที่สามารถทำได้จริง

- Automatic Stock Sync: ตัดสต็อกวัตถุดิบและบันทึกข้อมูลลง - Production Log (Batch ID) อัตโนมัติหลังยืนยันการผลิต



## API Reference

#### 1. Get all Materials
ดึงรายการวัตถุดิบทั้งหมดที่มีในสต็อก

```http
  GET /materials
```
- Response: Array of Materials (ID, Name, Price, Stock)
#### 2. Get Material
ดึงข้อมูลวัตถุดิบด้วย ID
```http
  GET /materials/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of Material to fetch |
- Response: Material (ID, Name, Price, Stock)


#### 3. Update Material Stock
แก้ไขข้อมูลปริมาณวัตถุดิบในคลัง
```http
  PATCH /materials/updateStock/{id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of Material to update stock |
- Request Body (JSON ): `{  "stock": 1500.0}`

#### 4. Insert recipes
บันทึกประวัติการผลิตอาหารสัตว์ลงในระบบ
```http
  POST /logs
```
- Request Body (JSON Array):
 ```json 
 [
    {
        "batchAmount": 100,
        "batchId": "B2601233536",
        "batchRecipe": "อาหารสุกรขุน สูตร 1",
        "date": "2026-01-23 12:12:13",
        "logId": 8,
        "materialName": "ไวตามินแร่ธาตุ (พรีมิกซ์)",
        "usedAmount": 0.25
    },
    {
        "batchAmount": 100,
        "batchId": "B2601233536",
        "batchRecipe": "อาหารสุกรขุน สูตร 1",
        "date": "2026-01-23 12:12:13",
        "logId": 7,
        "materialName": "เกลือป่น",
        "usedAmount": 0.35
    }
  ]
