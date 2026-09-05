import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: newTheme })
        document.documentElement.setAttribute('data-theme', newTheme)
      },
      initTheme: () => {
        const theme = get().theme
        document.documentElement.setAttribute('data-theme', theme)
      },

      // Chat History
      chatHistory: [],
      addMessage: (message) =>
        set((state) => ({
          chatHistory: [...state.chatHistory, { ...message, id: Date.now() + Math.random() }],
        })),
      clearChat: () => set({ chatHistory: [] }),

      // Profile
      profile: {
        name: 'Alex Johnson',
        email: 'alex.johnson@empai.com',
        title: 'Senior Product Manager',
        bio: 'Passionate about building products that make a difference.',
        department: 'Product',
        avatar: 'AJ',
      },
      updateProfile: (data) =>
        set((state) => ({ profile: { ...state.profile, ...data } })),

      // Notification preferences
      notifications: {
        emailNotifs: true,
        pushNotifs: false,
        weeklyDigest: true,
        chatSummary: true,
      },
      updateNotifications: (data) =>
        set((state) => ({ notifications: { ...state.notifications, ...data } })),
    }),
    {
      name: 'empai-store',
      partialize: (state) => ({
        theme: state.theme,
        chatHistory: state.chatHistory,
        profile: state.profile,
        notifications: state.notifications,
      }),
    }
  )
)

export default useAppStore
