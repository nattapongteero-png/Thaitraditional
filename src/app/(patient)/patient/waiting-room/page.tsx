"use client";

import { useState } from "react";
import {
  VideoOff,
  Wifi,
  CheckCircle2,
  PhoneOff,
} from "lucide-react";
import { MicIcon } from "../../../components/MicIcon";
import { MicOffIcon } from "../../../components/MicOffIcon";
import { CameraIcon } from "../../../components/CameraIcon";
import { CameraOffIcon } from "../../../components/CameraOffIcon";
import { TimeCircleIcon } from "../../../components/TimeCircleIcon";
import { CallSilentIcon } from "../../../components/CallSilentIcon";
import { ThreeUserIcon } from "../../../components/ThreeUserIcon";
import { DangerTriangleIcon } from "../../../components/DangerTriangleIcon";

const steps = [
  { id: "check", label: "ตรวจสอบอุปกรณ์", done: true },
  { id: "queue", label: "รอคิว", done: false, active: true },
  { id: "video", label: "เชื่อมต่อวิดีโอ", done: false },
];

export default function Page() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [joined, setJoined] = useState(false);

  if (joined) {
    return (
      <div className="h-[calc(100vh-8rem)] flex flex-col bg-gray-900 rounded-2xl overflow-hidden">
        {/* Video area */}
        <div className="flex-1 relative bg-slate-800 flex items-center justify-center">
          {/* Remote video placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-3xl">👨‍⚕️</span>
              </div>
              <p className="text-white text-sm opacity-70">นพ. สมชาย แพทย์ไทย</p>
              <div className="flex items-center gap-1 justify-center mt-1">
                <Wifi className="w-3 h-3 text-green-400" />
                <span className="text-green-400 text-xs">เชื่อมต่อแล้ว</span>
              </div>
            </div>
          </div>

          {/* Self view */}
          <div className="absolute bottom-4 right-4 w-36 h-24 bg-gray-700 rounded-xl border-2 border-white/20 flex items-center justify-center">
            {camOn ? (
              <div className="text-center">
                <div className="w-10 h-10 bg-forest-leaf rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-lg">👩</span>
                </div>
                <p className="text-white text-xs mt-1">คุณ</p>
              </div>
            ) : (
              <div className="text-center">
                <CameraOffIcon className="w-6 h-6 text-muted-moss mx-auto" />
                <p className="text-muted-moss text-xs mt-1">กล้องปิด</p>
              </div>
            )}
          </div>

          {/* Session info */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-xs">15:32</span>
          </div>

          {/* Secure badge */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur rounded-lg px-3 py-1.5">
            <span className="text-green-400 text-xs flex items-center gap-1">
              🔒 เข้ารหัสแบบ End-to-End
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 px-6 py-4 flex items-center justify-center gap-4">
          <button
            onClick={() => setMicOn(!micOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${micOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}
          >
            {micOn ? <MicIcon className="w-5 h-5 text-white" /> : <MicOffIcon className="w-5 h-5 text-white" />}
          </button>
          <button
            onClick={() => setCamOn(!camOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${camOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}
          >
            {camOn ? <CameraIcon className="w-5 h-5 text-white" /> : <CameraOffIcon className="w-5 h-5 text-white" />}
          </button>
          <button
            onClick={() => setJoined(false)}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors shadow-lg"
          >
            <CallSilentIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-deep-emerald">ห้องรอพบแพทย์</h2>
        <p className="text-muted-moss text-sm mt-1">กรุณารอจนกว่าแพทย์จะรับการเชื่อมต่อ</p>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-200 z-0">
            <div className="h-full bg-forest-leaf w-1/3" />
          </div>
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2 z-10 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                  ${s.done ? "bg-forest-leaf border-forest-leaf" : ""}
                  ${s.active ? "bg-white border-forest-leaf shadow-md shadow-pale-mint" : ""}
                  ${!s.done && !s.active ? "bg-white border-gray-300" : ""}`}
              >
                {s.done ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <div className={`w-3 h-3 rounded-full ${s.active ? "bg-forest-leaf animate-pulse" : "bg-gray-300"}`} />
                )}
              </div>
              <p className={`text-xs font-medium ${s.done || s.active ? "text-forest-leaf" : "text-muted-moss"}`}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Queue Status */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-forest-leaf to-teal-600 p-6 text-center text-white">
          <p className="text-pale-mint text-sm">ลำดับคิวของคุณ</p>
          <p className="text-6xl font-bold mt-1">3</p>
          <p className="text-pale-mint text-sm mt-2">ยังมีผู้รอก่อนคุณ 2 คน</p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-gray-100">
          {[
            { icon: TimeCircleIcon, label: "เวลาประมาณ", value: "~20 นาที", color: "text-amber-600" },
            { icon: ThreeUserIcon, label: "คิวรวม", value: "8 คิว", color: "text-blue-600" },
            { icon: CheckCircle2, label: "เสร็จแล้ว", value: "5 คิว", color: "text-forest-leaf" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-4 text-center">
                <Icon className={`w-5 h-5 ${item.color} mx-auto mb-1`} />
                <p className="font-semibold text-deep-emerald text-sm">{item.value}</p>
                <p className="text-muted-moss text-xs">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Device Check */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
        <h4 className="text-deep-emerald mb-4">ตรวจสอบอุปกรณ์</h4>
        <div className="space-y-3">
          {[
            { label: "กล้อง (Camera)", status: camOn, toggle: () => setCamOn(!camOn) },
            { label: "ไมโครโฟน (Microphone)", status: micOn, toggle: () => setMicOn(!micOn) },
          ].map((device) => (
            <div key={device.label} className="flex items-center justify-between p-3 bg-warm-sand rounded-xl">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${device.status ? "bg-forest-leaf" : "bg-red-500"}`}
                />
                <span className="text-sm text-olive-charcoal">{device.label}</span>
              </div>
              <div className="flex items-center gap-2">

                <button
                  onClick={device.toggle}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${device.status ? "bg-forest-leaf" : "bg-gray-300"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${device.status ? "translate-x-4" : "translate-x-0.5"}`}
                  />
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between p-3 bg-warm-sand rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-forest-leaf" />
              <span className="text-sm text-olive-charcoal">การเชื่อมต่ออินเทอร์เน็ต</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-lg bg-green-100 text-green-700">
                เร็ว (45 Mbps)
              </span>

            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom bar — Warning + Join Button */}
      <div className="sticky bottom-4 space-y-3 bg-warm-sand/80 backdrop-blur-sm rounded-2xl pt-3">
        {/* Warning */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3 shadow-sm">
          <DangerTriangleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            กรุณาอยู่ในพื้นที่ที่มีสัญญาณอินเทอร์เน็ตเสถียรและมีแสงสว่างเพียงพอ
            ระบบจะเชื่อมต่อโดยอัตโนมัติเมื่อถึงคิวของคุณ
          </p>
        </div>

        {/* Join Button */}
        <button
          onClick={() => setJoined(true)}
          className="w-full py-4 bg-forest-leaf hover:bg-forest-leaf-hover text-white rounded-2xl font-semibold flex items-center justify-center gap-3 transition-colors shadow-lg text-base"
        >
          <CallSilentIcon className="w-6 h-6" />
          เข้าร่วมการปรึกษา (Join Consultation)
        </button>
      </div>
    </div>
  );
}
