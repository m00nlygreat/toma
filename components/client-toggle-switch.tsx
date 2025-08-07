'use client';

import { Switch } from "./ui/toggle-switch";

export function ClientToggleSwitch() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="long-break" />
      <label htmlFor="long-break">Long Break</label>
    </div>
  );
}
