'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../utils/supabaseClient'

export default function AuthHashHandler() {
  const router = useRouter()
  
  useEffect(() => {
    const handleAuthHash = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      const type = hashParams.get('type')
      
      if (accessToken && refreshToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        })
        
        window.location.hash = ''
        
        if (type === 'signup') {
          router.push('/garage')
        } else {
          router.push('/')
        }
      }
    }
    
    handleAuthHash()
  }, [router])
  
  return null
}