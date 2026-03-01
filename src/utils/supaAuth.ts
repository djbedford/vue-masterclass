import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/authForm'

export const register = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (error) return console.error(error)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: formData.firstName.concat(' ', formData.lastName),
    })

    if (error) return console.error('Profiles Error', error)
  }

  return true
}

export const login = async (formData: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  return { error }
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) return console.error(error)

  return true
}
