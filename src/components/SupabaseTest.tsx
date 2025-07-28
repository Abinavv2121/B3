import { useSupabase } from '@/hooks/useSupabase'

const SupabaseTest = () => {
  const { isConnected, error } = useSupabase()

  if (isConnected === null) {
    return (
      <div className="fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
        Testing Supabase connection...
      </div>
    )
  }

  if (isConnected) {
    return (
      <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        ✅ Supabase connected successfully!
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      ❌ Supabase connection failed: {error}
    </div>
  )
}

export default SupabaseTest 