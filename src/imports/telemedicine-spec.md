TOP LEVEL SPECIFICATION (TLS) 
ระบบ Telemedicine ศูนย์การแพทย์แผนไทย 
 
Version 1.0 
 
1. OBJECTIVE 
 
พัฒนาระบบ Telemedicine แบบ Web Application รองรับ 
 
Patient Portal (Responsive / PWA) 
 
Doctor Portal (One-person clinic mode) 
 
Admin Portal 
 
Integration กับ EHP (PhamEnpointAPI – JWT) 
 
Online Payment 
 
Digital Signature (MOPH CA) 
 
Video Consultation (Jitsi WebRTC) 
 
Reporting & Audit ตาม TOR 
 
2. SYSTEM ARCHITECTURE 
2.1 High Level Architecture 
[Patient Web] 
        | 
[Frontend Web App (React/Vue)] 
        | 
[Backend API Service] 
        |----------------| 
        |                | 
[EHP Adapter]     [Payment Adapter] 
        |                | 
[PhamEnpointAPI]   [Payment Gateway] 
 
        | 
[Signature Adapter - MOPH CA] 
        | 
[Jitsi Video Server] 
2.2 Architecture Principles 
 
Clean Architecture 
 
Adapter Pattern สำหรับ Integration 
 
Feature Flag: Standalone / Integrated Mode 
 
Stateless API + JWT Session 
 
Separation Core vs External Connectors 
 
3. USER ROLES 
Role Description 
PATIENT ผู้รับบริการ 
DOCTOR แพทย์ 
ADMIN ผู้ดูแลระบบ 
ONE_PERSON_CLINIC หมอที่มีสิทธิ์ครบ 
4. FUNCTIONAL REQUIREMENTS 
4.1 PATIENT MODULE 
4.1.1 Authentication 
 
Username/Password 
 
รองรับ SSO (เตรียม adapter) 
 
Password policy 
 
OTP reset 
 
4.1.2 Appointment 
 
ดูเวลาว่าง 
 
จอง/เลื่อน/ยกเลิก 
 
แจ้งเตือน 
 
4.1.3 Waiting Room 
 
แสดงสถานะคิว 
 
ตรวจสอบกล้อง/ไมค์ 
 
Join Video (Jitsi) 
 
4.1.4 History 
 
ประวัติการรักษา 
 
ดาวน์โหลดเอกสาร PDF 
 
ติดตามสถานะส่งยา 
 
4.1.5 Consent 
 
แสดง Privacy Notice 
 
เก็บ timestamp/IP/UserAgent 
 
Versioned consent 
 
4.2 DOCTOR MODULE (ONE PERSON MODE) 
4.2.1 Today Queue Dashboard 
 
หน้าเดียวจบ 
 
รายการนัดวันนี้ (Pull จาก EHP) 
 
ปุ่ม Start Visit 
 
No-show 
 
Reschedule 
 
4.2.2 Visit Wizard (Single Screen Workflow) 
Step 1: Verify Patient 
 
ดึงข้อมูลจาก EHP 
 
แสดง HN/CID/Allergy 
 
Step 2: Triage 
 
Template 
 
Flag unsuitable for telemedicine 
 
Step 3: Video 
 
Jitsi Embedded 
 
Join/End 
 
เก็บ metadata 
 
Step 4: SOAP Note 
 
Structured S/O/A/P 
 
Template + Favorites 
 
ICD-10-TM 
 
Step 5: Orders 
 
หัตถการ 
 
ยา 
 
คำแนะนำ 
 
Step 6: Payment 
 
สร้าง Payment Intent 
 
Redirect Gateway 
 
Webhook verify 
 
Mark Paid 
 
Step 7: Documents 
 
Generate PDF 
 
Sign with MOPH CA 
 
Generate QR Verify 
 
Step 8: Close Case 
 
สรุปผล 
 
แจ้งผู้ป่วย 
 
นัดติดตาม 
 
4.3 ADMIN MODULE 
 
User Management (RBAC) 
 
Clinic Settings 
 
Slot configuration 
 
Template Management 
 
Integration Config 
 
Audit Viewer 
 
Dashboard Report 
 
5. EHP INTEGRATION SPECIFICATION 
5.1 Authentication 
 
JWT based 
 
Authorization: Bearer <token> 
 
Token refresh mechanism 
 
5.2 Data Pull Endpoints (Abstract) 
 
GET /patients?hn= 
 
GET /appointments?date= 
 
GET /allergies?patient_id= 
 
GET /masters/doctors 
 
GET /masters/services 
 
GET /masters/drugs 
 
5.3 Reliability 
 
Retry 2 ครั้ง 
 
Circuit Breaker 
 
Degraded Mode (Local Draft) 
 
6. PAYMENT MODULE 
6.1 Requirements 
 
รองรับ Gateway จริง 
 
Webhook verification 
 
HMAC signature validation 
 
Receipt PDF 
 
Refund Support 
 
6.2 Status Flow 
PENDING → PAID → FAILED → REFUNDED → CANCELLED 
7. VIDEO MODULE (JITSI) 
7.1 Requirements 
 
IFrame API 
 
Secure room name (encounter_id + random salt) 
 
Doctor = moderator 
 
Patient = participant 
 
Metadata logging 
 
8. DIGITAL SIGNATURE (MOPH CA) 
8.1 Requirements 
 
PDF Signing via MOPH CA API 
 
Hash verification 
 
QR verification endpoint 
 
Timestamp embed 
 
9. DATA MODEL (CORE ENTITIES) 
 
User 
 
Patient 
 
Appointment 
 
Encounter 
 
Triage 
 
SoapNote 
 
Diagnosis 
 
MedicationOrder 
 
Payment 
 
Delivery 
 
Document 
 
Consent 
 
AuditLog 
 
10. SECURITY REQUIREMENTS 
10.1 Authentication 
 
Strong password policy 
 
MFA (Doctor/Admin) 
 
Session timeout 
 
10.2 Authorization 
 
RBAC 
 
Clinic scope restriction 
 
10.3 Encryption 
 
TLS 1.2+ 
 
Encryption at rest 
 
Secret vault 
 
10.4 OWASP 
 
SQL Injection prevention 
 
XSS protection 
 
CSRF token 
 
Secure headers 
 
Rate limiting 
 
11. PERFORMANCE REQUIREMENTS 
 
รองรับ concurrent video sessions ตาม TOR 
 
API response < 2 sec (95 percentile) 
 
Load test report 
 
Horizontal scaling ready 
 
12. AUDIT & LOGGING 
 
ทุกการเข้าถึงเวชระเบียน 
 
Login success/failure 
 
Document signing log 
 
Payment transaction log 
 
API call log to EHP 
 
Export CSV ได้ 
 
13. TESTING & ACCEPTANCE 
13.1 Test Types 
 
Unit Test 
 
Integration Test 
 
UAT 
 
Security Test 
 
Load Test 
 
13.2 Must Pass Scenarios 
 
Patient นัด → Video → ได้เอกสาร 
 
Doctor ทำงานคนเดียวจบเคส 
 
Payment ชำระสำเร็จ 
 
เอกสารลงนามถูกต้อง 
 
ดึงข้อมูลจาก EHP สำเร็จ 
 
Audit log แสดงครบ 
 
14. DELIVERABLES 
 
Source Code 
 
Deployment Guide 
 
OpenAPI Spec 
 
Integration Document (EHP) 
 
Payment Flow Document 
 
Signature Flow Document 
 
UAT Report 
 
Security Report 
 
Load Test Report 
 
User Manual 
 
15. CLAUDE CODE AI IMPLEMENTATION STRATEGY 
 
Claude Code AI ต้อง: 
 
สร้าง Project Structure (Monorepo) 
 
สร้าง Core Domain Layer 
 
สร้าง Adapter Layer 
 
สร้าง API Contract 
 
สร้าง DB Schema Migration 
 
Generate OpenAPI 
 
Generate Unit Tests 
 
Generate UAT Checklist 
 
Generate Deployment Script (Docker) 
 
16. ONE-PERSON CLINIC GUARANTEE 
 
เพื่อให้หมอ 1 คนทำงานได้จริง: 
 
หน้า Today Queue เดียว 
 
Visit Wizard หน้าเดียว 
 
Template + Favorites 
 
Auto Generate PDF 
 
Auto Sign 
 
Auto Notify 
 
Default Clinic Settings 
 
ไม่ต้องตั้งค่าซับซ้อนก่อนใช้งาน 
 
17. FUTURE EXTENSION (Optional) 
 
AI SOAP Summary 
 
AI Triage 
 
AI Thai Medicine Recommendation 
 
Mobile App Wrapper