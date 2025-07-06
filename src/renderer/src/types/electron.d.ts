export interface IElectronAPI {
  getConfig: (key: string) => Promise<any>
  setConfig: (key: string, value: any) => Promise<boolean>
  getAppVersion: () => Promise<string>
  quitApp: () => Promise<void>
  openFile: () => Promise<string | null>
  saveFile: (content: string, filename?: string) => Promise<boolean>
  closeWindow: () => Promise<void>
  minimizeWindow: () => Promise<void>
}

declare global {
  interface Window {
    electron: any
    api: IElectronAPI
  }
} 