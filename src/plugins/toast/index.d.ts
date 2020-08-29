import Vue, { VueConstructor, VNode } from 'vue'

export interface ToastOption {
  message: string;
  icon?: string;
  close?: boolean;
  wait?: number;
  position?: 'top' | 'center' | 'bottom';
  round?: boolean;
  color?: string;
  bgColor?: string;
  width?: string;
  border?: string | boolean;
  height?: string;
}

export interface ToastVNode extends VNode {
  visible: boolean;
  timer: number;
  icon: string;
  message: string;
  close: boolean;
  wait: number;
  position: 'top' | 'center' | 'bottom';
  round: boolean;
  color: string;
  bgColor: string;
  width: string;
  border?: string | boolean;
  height: string;

  closeToast (): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast (option: ToastOption): ToastVNode
  }

  interface VueConstructor {
    $toast (option: ToastOption): ToastVNode
  }
}
