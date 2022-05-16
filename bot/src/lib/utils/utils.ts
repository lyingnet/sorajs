

export const utils = {
        registerRoutes: () => {
            import('../../routes/index.js')
            import('../../routes/auth/login.js')
            import('../hooks/DiscordStrategy.js')
            import('../../routes/auth/callback.js')
        },

    }