"use client";

import { ToastProvider } from "@heroui/toast";

export default function ToastWrapper() {
  return <ToastProvider placement="top-right" toastOffset={16} />;
}
