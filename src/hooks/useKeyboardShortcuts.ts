import { useEffect } from "react";

interface KeyboardShortcuts {
  onSpace?: () => void;
  onRightArrow?: () => void;
  onLeftArrow?: () => void;
  onR?: () => void;
  on1?: () => void;
  on2?: () => void;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default only for our shortcuts
      const key = event.key.toLowerCase();

      switch (key) {
        case " ":
          event.preventDefault();
          shortcuts.onSpace?.();
          break;
        case "arrowright":
          event.preventDefault();
          shortcuts.onRightArrow?.();
          break;
        case "arrowleft":
          event.preventDefault();
          shortcuts.onLeftArrow?.();
          break;
        case "r":
          event.preventDefault();
          shortcuts.onR?.();
          break;
        case "1":
          event.preventDefault();
          shortcuts.on1?.();
          break;
        case "2":
          event.preventDefault();
          shortcuts.on2?.();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]);
};
