# ใช้ Image Java 21 ที่เสถียรสำหรับโปรเจกต์ feedcalc
FROM eclipse-temurin:21-jdk-alpine

# กำหนดโฟลเดอร์ทำงานภายใน Container
WORKDIR /app

# 1. ก๊อปปี้สคริปต์ Maven และไฟล์ตั้งค่า (เพื่อทำ Layer Cache)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# 2. ก๊อปปี้ไฟล์ฐานข้อมูล SQLite มาไว้ที่ /app/feedcalc.db
COPY feedcalc.db ./feedcalc.db

# แก้ไขสิทธิ์ไฟล์ mvnw ให้รันบน Linux ได้
RUN chmod +x mvnw

# ดาวน์โหลด Dependencies (จะทำใหม่เฉพาะเมื่อ pom.xml เปลี่ยน)
RUN ./mvnw dependency:go-offline

# 3. ก๊อปปี้โค้ดทั้งหมดเข้าไปและสั่ง Build
COPY src ./src
RUN ./mvnw clean package -DskipTests

# 4. หัวใจสำคัญ: เปลี่ยนชื่อไฟล์ .jar ที่ Build ได้ให้เป็น app.jar
# วิธีนี้จะช่วยแก้ปัญหา "Unable to access jarfile target/*.jar"
RUN cp target/*.jar app.jar

# สั่งรันแอปพลิเคชัน
CMD ["java", "-jar", "app.jar"]