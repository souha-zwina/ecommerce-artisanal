// components/WebButton.tsx
import React from "react";
import { Platform, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface WebButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function WebButton({ title, onPress, disabled, icon, style, textStyle }: WebButtonProps) {
  if (Platform.OS === "web") {
    return (
      <button
        onClick={disabled ? undefined : onPress}
        disabled={disabled}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 24px",
          borderRadius: "16px",
          border: "none",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          width: "100%",
            ...(style as any),
        } as React.CSSProperties}
      >
        {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
          <span style={{ color: (textStyle as any)?.color || "#121212", ...(textStyle as any) }}>{title}</span>
      </button>
    );
  }

  // Mobile
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={style}
    >
      {icon && <Text>{icon}</Text>}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}