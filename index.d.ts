export interface IAlertOptions {
  title?: string;
  content?: string;
  maskClose?: boolean;
  buttonColor?: string;
  confirm?: Function;
}

export interface IConfirmOptions {
  title?: string;
  content?: string;
  cancelText?: string;
  confirmText?: string;
  cancelTextColor?: string;
  confirmTextColor?: string;
  showCancel?: boolean;
  confirm?: Function;
  cancel?: Function;
}

export interface IToastShowOptions {
  type?: string;
  duration?: number;
  mask?: boolean;
  message?: string;
  size?: number;
  color?: string;
  position?: string;
}
export interface IToast {
  show: (
    options: IToastShowOptions
  ) => {
    hide: (isHide: boolean) => void;
    then: (fn: () => void) => Promise<any>;
  };
}
export interface ILoadingShowOptions {
  content?: string;
  showText?: boolean;
  timeout?: number | null;
  hide?: <T>() => T;
}
export interface ILoading {
  show: (options?: ILoadingShowOptions) => Promise<any>;
  hide: <R>() => boolean | R;
}

export interface IActionSheetOptions {
  visible?: boolean;
  options?: Array<{
    text: string;
    type: string;
    openType: string;
  }>;
  maskCancel?: boolean;
  showCancel?: boolean;
  cancelText?: string;
}

export interface IActionSheet<T> {
  show: (options?: T) => void;
  hide: (options?: T) => void;
}

export interface ICountUpOptions {
  useEasing: boolean;
  useGrouping: boolean;
  separator: string;
  decimal: string;
  easingFn: (t: number, b: number, c: number, d: number) => number;
  formattingFn: (num: number) => string;
  prefix: string;
  suffix: string;
  numerals: Array<number>;
}
export function Alert(options: IAlertOptions): boolean | void;
export function Confirm(options: IConfirmOptions): boolean | void;
export function CountUp(
  startVal: number,
  endVal: number,
  decimals: number,
  duration: number,
  callback?: number,
  options?: ICountUpOptions
): boolean | void;
export const Toast: IToast;
export const Loading: ILoading;
export const ActionSheet: IActionSheet<IActionSheetOptions>;
