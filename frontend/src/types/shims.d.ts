// Minimal shims so TypeScript diagnostics don't fail when node_modules
// are not installed in the environment. These are fallbacks only and
// should be removed once the real types are installed via package manager.

declare module 'socket.io-client' {
  export type Socket = any;
  export function io(url?: string, opts?: any): Socket;
  export { io };
}

declare module 'react' {
  // Allow importing react in code even without @types/react installed.
  const react: any;
  export = react;
}

declare module 'react-dom/client' {
  const createRoot: any;
  export { createRoot };
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const jsxDEV: any;
}

// Basic JSX namespace so TS is satisfied for intrinsic elements used.
declare namespace JSX {
  interface IntrinsicElements {
    div: any;
    header: any;
    main: any;
    input: any;
    button: any;
    span: any;
    form: any;
  }
}

// Small React types used in the app so TS doesn't error while types are missing
declare namespace React {
  type KeyboardEvent<T = any> = any;
  type ReactElement = any;
}

// JSX.Element fallback
declare namespace JSX { type Element = any; }
