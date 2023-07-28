import { create } from 'zustand';

export const localStorageThemeConstant = 'ig_theme'
export const localStorageTokenConstant = 'ig_token'

export const useGlobalStore = create((set, get) => ({
  theme: localStorage.getItem(localStorageThemeConstant) ?? 'light',
  setTheme: () => {
    const theme = get().theme === 'light' ? 'dark' : "light"
    localStorage.setItem(localStorageThemeConstant, theme)
    set({ theme })
  },
  sidebarWidth: false,
  setSidebarWidth: (value=null) => {
    const width = value ?? get().sidebarWidth;
    set({ sidebarWidth: !width })
  }
}))

export const useAuthStore = create((set, get) => ({
  token: localStorage.getItem(localStorageTokenConstant) ?? null,
  setToken: (value) => {
    localStorage.setItem(localStorageTokenConstant, value)
    set({ token: value })
  },
  signedUser: null,
  setSignedUser: (value) => {
    set({ signedUser: value })
  }
}))

// selectors
export const tokenSelector = state => state.token;
export const setTokenSelector = state => state.setToken;
export const signedUserSelector = state => state.signedUser;
export const setSignedUserSelector = state => state.setSignedUser;
export const themeSelector = state => state.theme;
export const setThemeSelector = state => state.setTheme;
export const sidebarWidthSelector = state => state.sidebarWidth;
export const setSidebarWidthSelector = state => state.setSidebarWidth;