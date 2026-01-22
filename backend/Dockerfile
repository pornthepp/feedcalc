# ใช้ Image Java 21 ที่มีขนาดเล็กและเสถียร
FROM eclipse-temurin:21-jdk-alpine

# กำหนดโฟลเดอร์ทำงานภายใน Container
WORKDIR /app

# ก๊อปปี้สคริปต์ Maven Wrapper และไฟล์ตั้งค่าโปรเจกต์
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# แก้ไขสิทธิ์ไฟล์ mvnw ให้รันบน Linux ได้ (ป้องกันปัญหา Permission denied)
RUN chmod +x mvnw

# ดาวน์โหลด Dependencies ทั้งหมด (เพื่อใช้ประโยชน์จาก Layer Cache ของ Docker)
RUN ./mvnw dependency:go-offline

# ก๊อปปี้โค้ดทั้งหมดเข้าไป
COPY src ./src

# สั่ง Build โปรเจกต์เป็นไฟล์ .jar (ข้ามการรัน Test เพื่อความเร็ว)
RUN ./mvnw clean package -DskipTests

# สั่งรันแอปพลิเคชัน (Render จะส่งพอร์ตมาทางตัวแปร PORT)
CMD ["java", "-jar", "target/*.jar"]